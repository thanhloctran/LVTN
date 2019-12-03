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
    public interface IBinhLuanRepository
    {
        Task<IEnumerable<BinhLuanDSVM>> layDSBinhLuan();
        Task<BinhLuan> chiTietBinhLuan(string maBL);
        Task<dynamic> themBinhLuan(BinhLuan binhLuan);
        Task<dynamic> suaBinhLuan(BinhLuanUpdateVM binhLuan);
        Task<dynamic> xoaBinhLuan(string MaBL);
        Task<dynamic> chiTietBinhLuanAD(int maBL);
        Task<dynamic> traLoiBinhLuan(BinhLuanHoiDap binhLuan);
        Task<List<DSBinhLuanMaSP>> layDSBinhLuanSP(string maSP);
        Task<dynamic> xoaTraLoiBinhLuan(String MaTL);
    }
    public class BinhLuanRepository : IBinhLuanRepository
    {
        private readonly string connectionstr;

        public BinhLuanRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<List<DSBinhLuanMaSP>> layDSBinhLuanSP(string maSP)
        {
            List<DSBinhLuanMaSP> dsbinhLuanMaSP = new List<DSBinhLuanMaSP>();
            using (var connection = new SqlConnection(connectionstr))
            {
                var lstbinhLuan = connection.Query<BinhLuanDSVM>("select BL.MaBL, BL.DanhGia, BL.NoiDung, " +
                    "BL.NgayTao, TaiKhoan = (select TaiKhoan from NGUOIDUNG ND WHERE ND.MaND = BL.MaKH),  " +
                    "TenSP = (select SP.TenSP from SANPHAM_LOAI SP WHERE SP.MaSP = BL.MaSP)  from BINHLUAN BL WHERE BL.MaSP= '"+maSP+"' ORDER BY BL.MaBL DESC", commandType: CommandType.Text);
                foreach (var result in lstbinhLuan)
                {
                    DSBinhLuanMaSP dsbinhLuan = new DSBinhLuanMaSP();

                    BinhLuanDSVM chiTietBL = new BinhLuanDSVM();
                    chiTietBL.MaBL = result.MaBL;
                    chiTietBL.TenSP = result.TenSP;
                    chiTietBL.TaiKhoan = result.TaiKhoan;
                    chiTietBL.NoiDung = result.NoiDung;
                    chiTietBL.DanhGia = result.DanhGia;
                    chiTietBL.NgayTao = result.NgayTao;

                    dsbinhLuan.binhLuan = chiTietBL;

                    var lstBL = connection.Query<BinhLuanHoiDap>("SELECT * FROM TRALOIBL WHERE MaBL=" + result.MaBL, commandType: CommandType.Text);
                    if (lstBL != null)
                    {
                        foreach (var bl in lstBL)
                        {
                            BinhLuanHoiDap binhLuan = new BinhLuanHoiDap();
                            binhLuan.MaTL = bl.MaTL;
                            binhLuan.MaBL = bl.MaBL;
                            binhLuan.MaNV = bl.MaNV;
                            binhLuan.NgayTao = bl.NgayTao;
                            binhLuan.NoiDung = bl.NoiDung;

                            dsbinhLuan.dsHoiDap.Add(binhLuan);
                        }
                    }

                    dsbinhLuanMaSP.Add(dsbinhLuan);

                }
                {

                }

            }
            return dsbinhLuanMaSP;
        }
        public async Task<IEnumerable<BinhLuanDSVM>> layDSBinhLuan()
        {
            IEnumerable<BinhLuanDSVM> binhLuan = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                binhLuan = connection.Query<BinhLuanDSVM>("select BL.MaBL, BL.DanhGia, BL.NoiDung, " +
                    "BL.NgayTao, TaiKhoan = (select TaiKhoan from NGUOIDUNG ND WHERE ND.MaND = BL.MaKH),  " +
                    "TenSP = (select SP.TenSP from SANPHAM_LOAI SP WHERE SP.MaSP = BL.MaSP)  from BINHLUAN BL ORDER BY BL.NgayTao DESC" , commandType: CommandType.Text);
            }
            return binhLuan;
        }

        public async Task<BinhLuan> chiTietBinhLuan(string maBL)
        {
            BinhLuan binhLuan = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", maBL);
                p.Add("@TABLE", "BINHLUAN");
                binhLuan = connection.QuerySingleOrDefault<BinhLuan>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            }
            return binhLuan;
        }

        public async Task<dynamic> themBinhLuan(BinhLuan binhLuan)
        {
            DateTime now = DateTime.Now;
            string ngay = now.ToString();
            int tongNgBL = 0;
            float tongDanhGia = 0;
            float binhChon = 0;
            
            using (var connection = new SqlConnection(connectionstr))
            {
               

                var p = new DynamicParameters();
                p.Add("@DanhGia", binhLuan.DanhGia);
                p.Add("@NoiDung", binhLuan.NoiDung);
                p.Add("@MaKH", binhLuan.MaKH);
                p.Add("@MaSP", binhLuan.MaSP);
                p.Add("@NgayTao", ngay);

                connection.Query("BINHLUAN_INSERT", p, commandType: CommandType.StoredProcedure);
                string query = @"SELECT DanhGia FROM BINHLUAN WHERE MaSP= '"+ binhLuan.MaSP  + "'";

                var listDanhGia = await connection.QueryAsync<int>(query, commandType: CommandType.Text);
                foreach(int i in listDanhGia)
                {
                    tongDanhGia += i;
                    tongNgBL += 1;
                }
                binhChon =(float)(tongDanhGia/tongNgBL);
                binhChon = (float)Math.Round(binhChon,1);
                string query2 = @"UPDATE SANPHAM_LOAI SET LuotBC = "+ binhChon + " WHERE MaSP= '" + binhLuan.MaSP + "'";
                connection.QueryAsync(query2, commandType: CommandType.Text);

            }
            return "success";
        }

        public async Task<dynamic> suaBinhLuan(BinhLuanUpdateVM binhLuan)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@MaBL", binhLuan.MaBL);
                p.Add("@DanhGia", binhLuan.DanhGia);
                p.Add("@NoiDung", binhLuan.NoiDung);
                p.Add("@NgayTao", binhLuan.NgayTao);

                connection.Query<BinhLuan>("BINHLUAN_UPDATE", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }

        public async Task<dynamic> xoaBinhLuan(String MaBL)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@TABLE","BINHLUAN");
                p.Add("@ID", MaBL);
                connection.Query("SP_DELETE", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }
        public async Task<dynamic> traLoiBinhLuan(BinhLuanHoiDap binhLuan)
        {
            DateTime now = DateTime.Now;
            string ngay = now.ToString();
            using (var connection = new SqlConnection(connectionstr))
            {
                try
                {
                    var p = new DynamicParameters();
                    p.Add("@MaBL", binhLuan.MaBL);
                    p.Add("@NoiDung", binhLuan.NoiDung);
                    p.Add("@MaNV", binhLuan.MaNV);
                    p.Add("@NgayTao", ngay);
                    connection.Query<string>(@"INSERT INTO DBO.TRALOIBL (MaBL, MaNV, NoiDung ,NgayTao)
                VALUES(@MaBL, @MaNV, @NoiDung, @NgayTao)", p, commandType: CommandType.Text);
                }
                catch(Exception ex)
                {
                    return ex;
                }
                
            }
            return "success";
        }
        public async Task<dynamic> xoaTraLoiBinhLuan(String MaTL)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@TABLE", "TRALOIBL");
                p.Add("@ID", MaTL);
                connection.Query("SP_DELETE", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }
        public async Task<dynamic> chiTietBinhLuanAD(int maBL)
        {
           ChiTietBinhLuanVM chiTietBL = new ChiTietBinhLuanVM();

                using (var connection = new SqlConnection(connectionstr))
                {
                    var result  =  connection.QuerySingleOrDefault<ChiTietBinhLuanVM>(" SELECT MaBL,NgayTao, DanhGia, NoiDung, SP.MaSP, TenSP," +
                        " SP.DonGia, SP.HinhAnh, SP.TrangThai, SP.SoLuongTon, MaKH, ND.HoTen, ND.TaiKhoan, ND.Email, ND.SoDT " +
                        "FROM BINHLUAN BL " +
                        "INNER JOIN SANPHAM_LOAI SP ON BL.MaSP = SP.MaSP " +
                        "INNER JOIN NGUOIDUNG ND ON BL.MaKH = ND.MaND " +
                        "WHERE BL.MaBL ="+ maBL, commandType: CommandType.Text);
                if (result == null)
                {
                    return "Review is not exitst";
                }

                string queryND = "select TaiKhoan, HoTen, Email, SoDT, DiaChi  from NGUOIDUNG where MaND =" + result.MaKH;
                NguoiDungInforVM khachHang = connection.QuerySingleOrDefault<NguoiDungInforVM>(queryND, commandType: CommandType.Text);

                chiTietBL.MaBL = result.MaBL;
                chiTietBL.NoiDung = result.NoiDung;
                chiTietBL.DanhGia = result.DanhGia;
                chiTietBL.NgayTao = result.NgayTao;
                chiTietBL.MaSP = result.MaSP;
                chiTietBL.MaKH = result.MaKH;
                chiTietBL.KhachHang = khachHang;

                string querySP = "select MaSP, HinhAnh, TenSP, SoLuongTon, TrangThai, DonGia  from SANPHAM_LOAI where MaSP ='" + result.MaSP+"'";
                SanPhamVM sanPham = connection.QuerySingleOrDefault<SanPhamVM>(querySP, commandType: CommandType.Text);
                chiTietBL.SanPham = sanPham;

                var lstBL = connection.Query<BinhLuanHoiDap>("SELECT * FROM TRALOIBL WHERE MaBL="+maBL, commandType: CommandType.Text);
                if (lstBL != null)
                {
                    foreach (var bl in lstBL)
                    {
                        BinhLuanHoiDap binhLuan = new BinhLuanHoiDap();
                        binhLuan.MaTL = bl.MaTL;
                        binhLuan.MaBL = bl.MaBL;
                        binhLuan.MaNV = bl.MaNV;
                        binhLuan.NgayTao = bl.NgayTao;
                        binhLuan.NoiDung = bl.NoiDung;

                        chiTietBL.dsHoiDap.Add(binhLuan);
                    }
                }


            }
            return chiTietBL; 
        }
    }
}
