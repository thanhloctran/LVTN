using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;

namespace ShopOnlineBackEnd_Data.Repositories
{
    public interface IQuanLyNhapHangRepository
    {
        Task<IEnumerable<PhieuNhap>> layDSPhieuNhap(string key);
        Task<PhieuNhap> chiTietPhieuNhap(string MaPN);
        Task<dynamic> suaPhieuNhap(PhieuNhap phieuNhap);
        Task<dynamic> xoaPhieuNhap(string MaPN);
        Task<ChiTietPhieuNhapVM> chiTietPhieuNhapAD(int maPN);
        Task<dynamic> themPhieuNhapAD(PhieuNhapInsertVM phieuNhap);
    }
    public class QuanLyNhapHangRepository : IQuanLyNhapHangRepository
    {
        private readonly string connectionstr;
        ThongBaoLoi tbl = new ThongBaoLoi();

        public QuanLyNhapHangRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<IEnumerable<PhieuNhap>> layDSPhieuNhap(string key)
        {
            IEnumerable<PhieuNhap> phieuNhap = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("KEYWORD", key);
                p.Add("TABLE", "PHIEUNHAP");
                phieuNhap = connection.Query<PhieuNhap>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
            }
            return phieuNhap;
        }

        public async Task<PhieuNhap> chiTietPhieuNhap(string MaPN)
        {
            PhieuNhap phieuNhap = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", MaPN);
                p.Add("TABLE", "PHIEUNHAP");
                phieuNhap = connection.QuerySingleOrDefault<PhieuNhap>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            }
            return phieuNhap;
        }


        public async Task<dynamic> suaPhieuNhap(PhieuNhap phieuNhap)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@MaPN", phieuNhap.MaPN);
                p.Add("@NgayTao", phieuNhap.NgayTao);
                p.Add("@TrangThai", phieuNhap.TrangThai);
                p.Add("@MaNCC", phieuNhap.MaNCC);
                p.Add("@MaNV", phieuNhap.MaNV);

                connection.Query<PhieuNhap>("PHIEUNHAP_UPDATE", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }

        public async Task<dynamic> xoaPhieuNhap(String MaPN)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", MaPN);
                p.Add("TABLE", "PHIEUNHAP");
                p.Add("@resultSP", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                connection.Query<int>("SP_DELETE", p, commandType: CommandType.StoredProcedure);
                int result = p.Get<int>("@resultSP");
                if (result == -1)
                    return "Invoice is not exist";
                else
                    return "success";

            }
        } 
        public async Task<dynamic> themPhieuNhapAD(PhieuNhapInsertVM phieuNhap)
        {
            int? maPN = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {

                    var insertPN = @" INSERT INTO DBO.PHIEUNHAP(MaCode, NgayTao, MaNV, MaNCC)
	                                         VALUES (@MaCode,@NgayTao, @MaNV ,@MaNCC ); SELECT CAST(SCOPE_IDENTITY() as int)";
                    var p = new DynamicParameters();
                    p.Add("@NgayTao", phieuNhap.NgayTao);
                    p.Add("@MaCode", phieuNhap.MaCode);
                    p.Add("@MaNV", phieuNhap.MaNV);
                    p.Add("@MaNCC", phieuNhap.MaNCC);

                    maPN = await connection.ExecuteScalarAsync<int>(insertPN, p, transaction);

                    foreach (var item in phieuNhap.dsSanPham)
                    {

                        foreach (var itemSP in item.dsSeriSanPham)
                        {
                            var p2 = new DynamicParameters();
                            p2.Add("@MaSeRi", itemSP.MaSeri);
                            p2.Add("MaSP", item.MaSP);
                            var insertSeriSP = @"INSERT INTO DBO.SANPHAM(MaSeri, MaSP, TrangThai)
	                                                VALUES ( @MaSeRi, @MaSP, 1) ";
                            await connection.ExecuteScalarAsync<string>(insertSeriSP, p2, transaction);

                            var p3 = new DynamicParameters();
                            p3.Add("@MaSeri", itemSP.MaSeri);
                            p3.Add("@MaPN", maPN);
                            p3.Add("@DonGia", item.DonGia);
                            var insertCTPN = @"INSERT INTO DBO.CHITIETPHIEUNHAP(MaPN, MaSeri, DonGia)
	                                             VALUES (@MaPN, @MaSeri, @DonGia)";
                            await connection.ExecuteAsync(insertCTPN, p3, transaction);
                            
                        }
                        var p5 = new DynamicParameters();
                        p5.Add("MaSP", item.MaSP);

                        var querySoLuong = @"SELECT COUNT(MaSeri) FROM SANPHAM WHERE MaSP = @MaSP AND TrangThai=1";
                        int? soLuongTon = await connection.ExecuteScalarAsync<int>(querySoLuong, p5, transaction);

                        var p4 = new DynamicParameters();
                        p4.Add("@SoluongTon", soLuongTon);
                        p4.Add("MaSP", item.MaSP);
                        var updateNumberProduct = @"UPDATE dbo.SANPHAM_LOAI
                                        SET SoLuongTon= @SoluongTon, TrangThai = 1 WHERE MaSP = @MaSP";
                        await connection.ExecuteAsync(updateNumberProduct, p4, transaction);
                    }
                    transaction.Commit();
                    return "success";
                }
                catch (Exception ex)
                {
                    //Log the exception (ex)
                    //System.Diagnostics.Debug.WriteLine(ex);
                    try
                    {
                        transaction.Rollback();
                    }
                    catch (Exception ex2)
                    {
                        // Handle any errors that may have occurred
                        // on the server that would cause the rollback to fail, such as
                        // a closed connection.
                        // Log the exception ex2
                        var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Can not Rollback!");
                        return response.Content;
                    }
                    var response2 = await tbl.TBLoi(ThongBaoLoi.Loi500, "Value is wrong! Insert order fail");
                    return ex;
                }
            }

        }
        public async Task<ChiTietPhieuNhapVM> chiTietPhieuNhapAD(int maPN)
        {
            var connection = new SqlConnection(connectionstr);
            string queryGroupByDDH = @"SELECT  SP.MaSP, (SELECT SPL.TenSP From SANPHAM_LOAI SPL
                WHERE SPL.MaSP = SP.MaSP) as TenSP,COUNT(SP.MaSP)AS SoLuong, CTDDH.DonGia 
                FROM CHITIETPHIEUNHAP CTDDH 
                LEFT JOIN SANPHAM SP ON CTDDH.MaSeri = SP.MaSeri  
               WHERE MaPN="+maPN+" GROUP BY MaSP, DonGia";
            var chiTiet = connection.Query<SanPhamDDH>(queryGroupByDDH, commandType: CommandType.Text);


            var p = new DynamicParameters();
            p.Add("@ID", maPN);
            p.Add("@TABLE", "PHIEUNHAP");
            PhieuNhap phieuNhap = connection.QuerySingleOrDefault<PhieuNhap>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

            string queryND = "select TaiKhoan, HoTen, Email, SoDT, DiaChi  from NGUOIDUNG where MaND =" + phieuNhap.MaNV;
            NguoiDungInforVM nhanVien = connection.QuerySingleOrDefault<NguoiDungInforVM>(queryND, commandType: CommandType.Text);
            ChiTietPhieuNhapVM ct = new ChiTietPhieuNhapVM();

            ct.MaPN = maPN;
            ct.MaCode = phieuNhap.MaCode;
            ct.TrangThai = phieuNhap.TrangThai;
            ct.MaNCC = phieuNhap.MaNCC;
            ct.MaNV = phieuNhap.MaNV;
            ct.NgayTao = phieuNhap.NgayTao;
            ct.TongTien = phieuNhap.TongTien;
            ct.nhanVien = nhanVien;

            foreach (var item in chiTiet)
            {

                SanPhamLoaiPhieuNhap itemPN = new SanPhamLoaiPhieuNhap();
                itemPN.MaSP = item.MaSP;
                itemPN.tenSP = item.tenSP;
                itemPN.SoLuong = item.SoLuong;
                itemPN.DonGia = item.DonGia;
                string querySeri = "select CT.MaSeri from CHITIETPHIEUNHAP CT " +
                    "INNER JOIN SANPHAM SP ON CT.MaSeri = SP.MaSeri " +
                    "where MaPN = "+ maPN + " and SP.MaSP ='"+ item.MaSP + "'" ;
                var sp = await connection.QueryAsync<string>(querySeri, commandType: CommandType.Text);
                foreach(var spnhap in sp)
                {
                    itemPN.dsSeriSanPham.Add(spnhap);
                }

                ct.TongTien += (itemPN.SoLuong * itemPN.DonGia);
                ct.DSSanPhamNhap.Add(itemPN);

            }
            return ct;

        }


    }
}
