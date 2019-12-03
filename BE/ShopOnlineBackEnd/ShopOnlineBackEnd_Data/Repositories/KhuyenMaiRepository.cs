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
    public interface IKhuyenMaiRepository
    {
        Task<IEnumerable<KhuyenMai>> layDSKhuyenMai();
        Task<dynamic> chiTietKhuyenMai(int maKM);
        Task<dynamic> themKhuyenMai(KhuyenMaiInsertVM khuyenMai);
        Task<dynamic> suaKhuyenMai(KhuyenMaiUpdateVM khuyenMai);
        Task<dynamic> xoaKhuyenMai(string MaKM);
        Task<dynamic> layThongTinKhuyenMai(int MaKM);
        Task<List<SanPhamKM>> layDSSanPhamKMInsert();
    }
    public class KhuyenMaiRepository : IKhuyenMaiRepository
    {
        private readonly string connectionstr;
        ThongBaoLoi tbl = new ThongBaoLoi();

        public KhuyenMaiRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<IEnumerable<KhuyenMai>> layDSKhuyenMai()
        {
            IEnumerable<KhuyenMai> khuyenMai = null;
            var connection = new SqlConnection(connectionstr);
            DateTime now = DateTime.Now;
            string ngay = now.ToString();
            string query = @"SELECT KM.MaKM, KM.Code, KM.NgayBD, KM.NgayKT, KM.MaNV, KM.MoTa, 
            (SELECT 1 FROM KHUYENMAI KMCT WHERE KMCT.MaKM = KM.MAKM AND '"+ngay+@"' BETWEEN KMCT.NgayBD AND KMCT.NgayKT  ) AS TrangThai  
            FROM KHUYENMAI KM WHERE KM.TrangThai =1 ORDER BY KM.NgayBD DESC";
            khuyenMai = connection.Query<KhuyenMai>(query, commandType: CommandType.Text);
            return khuyenMai;
        }
        public async Task<List<SanPhamKM>> layDSSanPhamKMInsert()
        {
            List<SanPhamKM> danhSachSP = new List<SanPhamKM>();
            using (var connection = new SqlConnection(connectionstr))
            {
                IEnumerable<SanPhamLoai> dsSanPham = null;
                var p = new DynamicParameters();
                p.Add("@KEYWORD", null);
                p.Add("@TABLE", "SANPHAMLOAI");
                DateTime now = DateTime.Now;
                string ngay = now.ToString();
                dsSanPham = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
                foreach (var item in dsSanPham)
                {

                    string query = @"select  CT.GiamGia 
                    from CHITIETKHUYENMAI CT inner join KHUYENMAI KM
                    ON  CT.MaKM = KM.MaKM 
                    WHERE '" + ngay + "' BETWEEN KM.NgayBD AND KM.NgayKT AND CT.MaSP = '" + item.MaSP + "' AND KM.TrangThai =1 ";

                    int giamGia = connection.QuerySingleOrDefault<int>(query, commandType: CommandType.Text);
                    if (giamGia == 0 )
                    {
                        SanPhamKM sp = new SanPhamKM();
                        sp.MaSP = item.MaSP;
                        sp.TenSP = item.TenSP;
                        sp.GiamGia = 0;

                        danhSachSP.Add(sp);

                    }


                }
            }
            return danhSachSP;
        }

        public async Task<dynamic> chiTietKhuyenMai(int maKM)
        {
            KhuyenMai khuyenMai = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", maKM);
                p.Add("@TABLE", "KHUYENMAI");
                khuyenMai = connection.QuerySingleOrDefault<KhuyenMai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
                if (khuyenMai == null)
                {
                    var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Discount not exist!");
                    return response.Content;
                }
            }
            return khuyenMai;
        }
        public async Task<dynamic> themKhuyenMai(KhuyenMaiInsertVM khuyenMai)
        {
            int? maKM = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var insertKMQuery = @"INSERT INTO DBO.KHUYENMAI (Code, NgayBD, NgayKT,MaNV, MoTa, TrangThai)
	                                  VALUES (@Code, @NgayBD, @NgayKT,@MaNV, @MoTa, @TrangThai );
                                      SELECT CAST(SCOPE_IDENTITY() as int)";
                    var p = new DynamicParameters();
                    p.Add("@Code", khuyenMai.Code);
                    p.Add("@NgayBD", khuyenMai.NgayBD);
                    p.Add("@NgayKT", khuyenMai.NgayKT);
                    p.Add("@TrangThai", khuyenMai.TrangThai);
                    p.Add("@MoTa", khuyenMai.MoTa);
                    p.Add("@MaNV", khuyenMai.MaNV);



                    maKM = await connection.ExecuteScalarAsync<int>(insertKMQuery, p, transaction);

                    foreach (var item in khuyenMai.dsSanPhamKM)
                    {
                        var p2 = new DynamicParameters();
                        p2.Add("@MaSP", item.MaSP);
                        p2.Add("@MaKM", maKM);
                        p2.Add("@GiamGia", item.GiamGia);

                        var insertCTKM = @"INSERT INTO DBO.CHITIETKHUYENMAI (MaKM, MaSP, GiamGia)
	                                            VALUES (@MaKM, @MaSP, @GiamGia);";
                        await connection.ExecuteAsync(insertCTKM, p2, transaction);

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
                    var response2 = await tbl.TBLoi(ThongBaoLoi.Loi500, "Value is wrong! Insert discount fail");
                    return response2.Content;
                }

            }

        }

        public async Task<dynamic> suaKhuyenMai(KhuyenMaiUpdateVM khuyenMai)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var updateKMQuery = @"UPDATE DBO.KHUYENMAI SET 
                                            Code= @Code, 
                                            NgayBD= @NgayBD, 
                                            NgayKT=  @NgayKT,
                                            MaNV= @MaNV, 
                                            MoTa= @MoTa
                                          WHERE MaKM = @MaKM   DELETE FROM DBO.CHITIETKHUYENMAI WHERE MaKM = @MaKM
                                        ";
                    var p = new DynamicParameters();
                    p.Add("@Code", khuyenMai.Code);
                    p.Add("@NgayBD", khuyenMai.NgayBD);
                    p.Add("@NgayKT", khuyenMai.NgayKT);
                    p.Add("@MaKM", khuyenMai.MaKM);
                    p.Add("@MoTa", khuyenMai.MoTa);
                    p.Add("@MaNV", khuyenMai.MaNV);

                    await connection.ExecuteScalarAsync(updateKMQuery, p, transaction);

                    foreach (var item in khuyenMai.dsSanPhamKM)
                    {
                        var p2 = new DynamicParameters();
                        p2.Add("@MaSP", item.MaSP);
                        p2.Add("@MaKM", khuyenMai.MaKM);
                        p2.Add("@GiamGia", item.GiamGia);

                        var insertCTKM = @"INSERT INTO DBO.CHITIETKHUYENMAI (MaKM, MaSP, GiamGia)
	                                            VALUES (@MaKM, @MaSP, @GiamGia);";
                        await connection.ExecuteAsync(insertCTKM, p2, transaction);

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
                    var response2 = await tbl.TBLoi(ThongBaoLoi.Loi500, "Value is wrong! Insert discount fail");
                    return response2.Content;
                }

            }

        }

        public async Task<dynamic> xoaKhuyenMai(string MaKM)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", MaKM);
                p.Add("@TABLE", "KHUYENMAI");
                p.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                connection.Query("SP_DELETE", p, commandType: CommandType.StoredProcedure);

                int result = p.Get<int>("Result");
                if (result == 0)
                {
                    return "Discount is opening! Close this before delete!";
                }
                else if (result == -1)
                {
                    return "Discount is not exist";
                }
                return "success";
            }
            
        }

        public async Task<dynamic> layThongTinKhuyenMai(int MaKM)
        {
            var connection = new SqlConnection(connectionstr);
            string queryGroupByMaKM = "SELECT SP.HinhAnh,  SP.MaSP, (SELECT SPL.TenSP From SANPHAM_LOAI SPL WHERE SPL.MaSP = SP.MaSP) as TenSP, CTKM.GiamGia FROM CHITIETKHUYENMAI CTKM LEFT JOIN SANPHAM_LOAI SP ON CTKM.MaSP = SP.MaSP  WHERE MaKM=" + MaKM;
            var dsSanPham = connection.Query<SanPhamKM>(queryGroupByMaKM, commandType: CommandType.Text);
            var p = new DynamicParameters();
            p.Add("@ID", MaKM);
            p.Add("@TABLE", "KHUYENMAI");
            KhuyenMai khuyenMai = connection.QuerySingleOrDefault<KhuyenMai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            if (khuyenMai == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Discount not exist!");
                return response.Content;
            }
            ChiTietKhuyenMaiVM thongTinCTKM = new ChiTietKhuyenMaiVM();

            thongTinCTKM.MaKM = MaKM;
            thongTinCTKM.NgayBD = khuyenMai.NgayBD;
            thongTinCTKM.NgayKT = khuyenMai.NgayKT;
            thongTinCTKM.MoTa = khuyenMai.MoTa;
            thongTinCTKM.Code = khuyenMai.Code;

            thongTinCTKM.MaNV = khuyenMai.MaNV;
            // load thong tin nhân viên ???

            foreach (var sanPham in dsSanPham)
            {

                SanPhamKM sanPhamKM = new SanPhamKM();

                sanPhamKM.MaSP = sanPham.MaSP;
                sanPhamKM.TenSP = sanPham.TenSP;
                sanPhamKM.HinhAnh = sanPham.HinhAnh;
                sanPhamKM.GiamGia = sanPham.GiamGia;

                thongTinCTKM.giamGia = sanPham.GiamGia;
                thongTinCTKM.DSSanPhamKM.Add(sanPhamKM);

            }
            return thongTinCTKM;

        }

    }
}
