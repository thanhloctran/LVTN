using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;

namespace ShopOnlineBackEnd_Data.Repositories
{
    public interface IQuanLyDatHangRepository
    {
        Task<IEnumerable<DonDatHang>> layDSDonDatHang(string key);
        Task<IEnumerable<DonDatHang>> layDSDonDatHangClient(string taiKhoan, string trangThai);
        Task<DonDatHang> chiTietDonDatHang(string MaDDH);
        Task<dynamic> themDonDatHang(DonDatHangInsertVM donDatHang);
        Task<dynamic> capNhatTrangThaiDonDatHang(DonDatHangUpdateStatus item);
        Task<dynamic> suaDonDatHang(DonDatHang donDatHang);
        Task<dynamic> xoaDonDatHang(string MaDDH);
        Task<object> chiTietDonDatHangAD(int MaDDH);
    }
    public class QuanLyDatHangRepository : IQuanLyDatHangRepository
    {
        private readonly string connectionstr;
        ThongBaoLoi tbl = new ThongBaoLoi();

        public QuanLyDatHangRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<IEnumerable<DonDatHang>> layDSDonDatHang(string trangThai)
        {
            IEnumerable<DonDatHang> donDatHang = null;
            var connection = new SqlConnection(connectionstr);

            var p = new DynamicParameters();
            p.Add("KEYWORD", trangThai);
            p.Add("TABLE", "DONDATHANG");
            donDatHang = connection.Query<DonDatHang>("SP_GETALL", p, commandType: CommandType.StoredProcedure);

            connection.Close();
            return donDatHang;
        }

        public async Task<IEnumerable<DonDatHang>> layDSDonDatHangClient(string maND, string trangThai)
        {
            IEnumerable<DonDatHang> donDatHang = null;
            var connection = new SqlConnection(connectionstr);

            var p = new DynamicParameters();
            p.Add("@MaND", maND);
            p.Add("@TrangThai", trangThai);
            donDatHang = connection.Query<DonDatHang>("[SP_LAYDSDDHTHEONGUOIDUNG]", p, commandType: CommandType.StoredProcedure);

            connection.Close();
            return donDatHang;
        }
        public async Task<DonDatHang> chiTietDonDatHang(string MaDDH)
        {
            DonDatHang donDatHang = null;
            var connection = new SqlConnection(connectionstr);

            var p = new DynamicParameters();
            p.Add("@ID", MaDDH);
            p.Add("@TABLE", "DONDATHANG");
            donDatHang = connection.QuerySingleOrDefault<DonDatHang>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

            connection.Close();
            return donDatHang;
        }

        public async Task<dynamic> themDonDatHang(DonDatHangInsertVM donDatHang)
        {
            int? maDDH = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var insertDDH = @" IF @MaKH=0 SET @MaKH= NULL
	                                   IF @MaNV= 0 SET @MaNV= NULL INSERT INTO DBO.DONDATHANG (NgayDat, TrangThai, MaKH, MaNV, TinhTrang, DiaChiNhan, TenNguoiNhan, SoDT, Email) VALUES ( @NgayDat, 0, @MaKH, @MaNV, @TinhTrang, @DiaChiNhan, @TenNguoiNhan, @SoDT, @Email ); SELECT CAST(SCOPE_IDENTITY() as int)";
                    var p = new DynamicParameters();
                    p.Add("@NgayDat", donDatHang.NgayDat);
                    p.Add("@MaKH", donDatHang.MaKH);
                    p.Add("@MaNV", donDatHang.MaNV);
                    p.Add("@TinhTrang", donDatHang.TinhTrang);
                    p.Add("@DiaChiNhan", donDatHang.DiaChiNhan);
                    p.Add("@TenNguoiNhan", donDatHang.TenNguoiNhan);
                    p.Add("@SoDT", donDatHang.SoDT);
                    p.Add("@Email", donDatHang.Email);


                    maDDH = await connection.ExecuteScalarAsync<int>(insertDDH, p, transaction);

                    foreach (var item in donDatHang.dsSanPham)
                    {
                        for (int i = 0; i < item.SoLuong; i++)
                        {
                            var p2 = new DynamicParameters();
                            p2.Add("@MaSP", item.MaSP);

                            var insertCTDDH = @"INSERT INTO DBO.CHITIETDONDATHANG(MADDH, MaSeri, DonGia)
                                                VALUES(@MaDDH, @MaSeri, @DonGia)";

                            var selectSeriInsert = "DECLARE @ID varchar(10) " +
                                "SET @ID = (SELECT TOP 1 MaSeri FROM SANPHAM WHERE MaSP= @MaSP AND TrangThai=1)" +
                                "UPDATE SANPHAM SET TrangThai=0 WHERE MaSeri = @ID  " +
                                "SELECT @ID";

                            string seri = await connection.ExecuteScalarAsync<string>(selectSeriInsert, p2, transaction);

                            var p3 = new DynamicParameters();
                            p3.Add("@MaSeri", seri);
                            p3.Add("@MaDDH", maDDH);
                            p3.Add("@DonGia", item.DonGia);
                            await connection.ExecuteAsync(insertCTDDH, p3, transaction);

                            var reduceProduct = @"UPDATE dbo.SANPHAM_LOAI SET
		                                  SoLuongTon= SoLuongTon-1  WHERE MaSP = @MaSP ";
                            await connection.ExecuteAsync(reduceProduct, p2, transaction);
                        }
                    }
                    transaction.Commit();
                    return "success";
                }
                catch (Exception ex)
                {
                    //Log the exception (ex)
                    System.Diagnostics.Debug.WriteLine(ex);
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

        public async Task<dynamic> suaDonDatHang(DonDatHang donDatHang)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@MaDDH", donDatHang.MaDDH);
                p.Add("@NgayDat", donDatHang.NgayDat);
                p.Add("@TrangThai", donDatHang.TrangThai);
                p.Add("@MaKH", donDatHang.MaKH);
                p.Add("@MaNV", donDatHang.MaNV);
                p.Add("@TinhTrang", donDatHang.TinhTrang);
                p.Add("@DiaChiNhan", donDatHang.DiaChiNhan);
                p.Add("@TenNguoiNhan", donDatHang.TenNguoiNhan);
                p.Add("@SoDienThoai", donDatHang.SoDT);
                p.Add("@Email", donDatHang.Email);

                connection.Query<DonDatHang>("DONDATHANG_UPDATE", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }
        public async Task<dynamic> capNhatTrangThaiDonDatHang(DonDatHangUpdateStatus item)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", item.MaDDH);
                p.Add("@TrangThai", item.TrangThai);
                p.Add("@MaNV", item.MaNV);
                p.Add("@NgayXuLy", item.NgayXuLy);
                connection.Query<string>("SP_CAPNHATTRANGTHAIDDH", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }

        public async Task<dynamic> xoaDonDatHang(String MaDDH)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", MaDDH);
                p.Add("TABLE", "DONDATHANG");
                p.Add("@resultSP", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                connection.Query<int>("SP_DELETE", p, commandType: CommandType.StoredProcedure);
                int result = p.Get<int>("@resultSP");
                if (result == -2)
                {
                    return "Order must be canceled before delete";
                }
                else if (result == -1)
                {
                    return "Order is not exist";
                }
                else
                {
                    return "success";
                }
            }
        }

        public async Task<object> chiTietDonDatHangAD(int MaDDH)
        {

            var connection = new SqlConnection(connectionstr);
            string queryGroupByDDH = "SELECT  SP.MaSP, (SELECT SPL.TenSP From SANPHAM_LOAI SPL" +
                " WHERE SPL.MaSP = SP.MaSP) as TenSP,COUNT(SP.MaSP)AS SoLuong, CTDDH.DonGia " +
                "FROM CHITIETDONDATHANG CTDDH " +
                "LEFT JOIN SANPHAM SP ON CTDDH.MaSeri = SP.MaSeri  " +
                "WHERE MaDDH=" + MaDDH + " GROUP BY MaSP, DonGia";
            var chiTiet = connection.Query<SanPhamDDH>(queryGroupByDDH, commandType: CommandType.Text);

            
            var p = new DynamicParameters();
            p.Add("@ID", MaDDH);
            p.Add("@TABLE", "DONDATHANG");
            DonDatHang donDatHang = connection.QuerySingleOrDefault<DonDatHang>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

            string queryND = "select TaiKhoan, HoTen, Email, SoDT, DiaChi  from NGUOIDUNG where MaND ="+donDatHang.MaKH;
            NguoiDungInforVM khachHang = connection.QuerySingleOrDefault<NguoiDungInforVM>(queryND, commandType: CommandType.Text);
            ChiTietDonDatHangVM ct = new ChiTietDonDatHangVM();

            ct.MaDDH = MaDDH;
            ct.NgayDat = donDatHang.NgayDat;
            ct.TrangThai = donDatHang.TrangThai;
            ct.TinhTrang = donDatHang.TinhTrang;
            ct.DiaChiNhan = donDatHang.DiaChiNhan;
            ct.TenNguoiNhan = donDatHang.TenNguoiNhan;
            ct.Email = donDatHang.Email;
            ct.SoDT = donDatHang.SoDT;
            ct.TongTien = 0;
            ct.khachHang = khachHang;
           
            //int idND = donDatHang.MaKH;

            foreach (var item in chiTiet)
            {

                SanPhamDDH itemOrder = new SanPhamDDH();

                itemOrder.tenSP = item.tenSP;
                itemOrder.SoLuong = item.SoLuong;
                itemOrder.DonGia = item.DonGia;
                ct.TongTien += (itemOrder.SoLuong * itemOrder.DonGia);

                ct.DSSanPhamDDH.Add(itemOrder);

            }
            return ct;

        }

    }
}
