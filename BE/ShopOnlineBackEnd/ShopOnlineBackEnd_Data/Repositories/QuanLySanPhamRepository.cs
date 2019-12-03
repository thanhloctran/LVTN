using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Text.RegularExpressions;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;

namespace ShopOnlineBackEnd_Data.Repositories
{
    public interface IQuanLySanPhamRepository
    {
        Task<List<SanPhamVM>> layDSSanPhamLoaiAD(string key);
        Task<List<SanPhamKhuyenMai>> layDSSanPhamCL(string key);
        Task<IEnumerable<SanPhamLoai>> layDSSanPham(string key);
        Task<dynamic> chiTietSanPham(string maSP);
        Task<dynamic> themSanPhamLoai(SanPhamLoai sanPhamLoai);
        Task<dynamic> suaSanPhamLoai(SanPhamLoai sanPhamLoai);
        Task<dynamic> xoaSanPhamLoai(string MaSP);
        Task<dynamic> chiTietSanPhamAD(string maSP);
        Task<IEnumerable<SanPhamLoai>> layDSSanPhamMoi();
        Task<IEnumerable<SanPhamLoai>> layDSSanPhamTheoLoai(string maLoai);
        Task<IEnumerable<SanPhamKhuyenMai>> layDSSanPhamKM();
        Task<IEnumerable<BinhLuanVM>> layDSBinhLuan(string maSP);
        Task<IEnumerable<LoaiSanPham>> layDSLoaiSanPham();
       


    }
    public class QuanLySanPhamRepository : IQuanLySanPhamRepository
    {
        private readonly string connectionstr;
        ThongBaoLoi tbl = new ThongBaoLoi();
        private readonly string hostImage =  "https://localhost:44302/images/";

        public QuanLySanPhamRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<List<SanPhamVM>> layDSSanPhamLoaiAD(string key)
        {
            List<SanPhamVM> sanPham = new List<SanPhamVM>();
            IEnumerable<SanPhamLoai> sanPhamLoai = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@KEYWORD", key);
                p.Add("@TABLE", "SANPHAMLOAI");
                sanPhamLoai = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
                foreach(var item in sanPhamLoai)
                {
                    SanPhamVM sp = new SanPhamVM();
                    sp.DonGia = item.DonGia;
                    sp.HinhAnh = item.HinhAnh;
                    sp.MaSP = item.MaSP;
                    sp.SoLuongTon = item.SoLuongTon;
                    sp.TrangThai = item.TrangThai;
                    sp.TenSP = item.TenSP;

                    sanPham.Add(sp);
                }

            }
            return sanPham;
        }
        public async Task<IEnumerable<SanPhamLoai>> layDSSanPham(string key)
        {
            IEnumerable<SanPhamLoai> dsSanPham = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@KEYWORD", key);
                p.Add("@TABLE", "SANPHAMLOAI");
                dsSanPham = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
            }
            return dsSanPham;
        }
        public async Task<List<SanPhamKhuyenMai>> layDSSanPhamCL(string key)
        {
            List<SanPhamKhuyenMai> dsSanPhamBig = new List<SanPhamKhuyenMai>();
            using (var connection = new SqlConnection(connectionstr))
            {
                IEnumerable<SanPhamLoai> dsSanPham = null;
                var p = new DynamicParameters();
                p.Add("@KEYWORD", key);
                p.Add("@TABLE", "SANPHAMLOAI");
                DateTime now = DateTime.Now;
                //Console.WriteLine("Now is " + now);
                string ngay = now.ToString();

                dsSanPham = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
                foreach (var item in dsSanPham)
                {

                    string query = @"select  CT.GiamGia 
                    from CHITIETKHUYENMAI CT inner join KHUYENMAI KM
                    ON  CT.MaKM = KM.MaKM 
                    WHERE '" + ngay +"' BETWEEN KM.NgayBD AND KM.NgayKT AND CT.MaSP = '"+item.MaSP+"' AND TrangThai = 1 " ;

                   int giamGia = connection.QuerySingleOrDefault<int>(query, commandType: CommandType.Text);
                    if (giamGia == null)
                    {
                        giamGia = 0;
                    }
                    SanPhamKhuyenMai sp = new SanPhamKhuyenMai();
                    sp.MaSP = item.MaSP;
                    sp.TenSP = item.TenSP;
                    sp.DonGia = item.DonGia;
                    sp.SoLuongTon = item.SoLuongTon;
                    sp.HinhAnh = item.HinhAnh;
                    sp.MoTa = item.MoTa;
                    sp.LuotXem = item.LuotXem;
                    sp.LuotBC = item.LuotBC;
                    sp.SoLanMua = item.SoLanMua;
                    sp.MaNCC = item.MaNCC;
                    sp.MaNSX = item.MaNSX;
                    sp.MaLoaiSP = item.MaLoaiSP;
                    sp.TrangThai = item.TrangThai;
                    sp.SPMoi = item.SPMoi;
                    sp.GiamGia = giamGia;


                    dsSanPhamBig.Add(sp);
                }
            }
            return dsSanPhamBig;
        }
        

        public async Task<dynamic> chiTietSanPham(string maSP)
        {
            SanPhamLoai sanPhamLoai = null;
            SanPhamDetailVM sanPham = new SanPhamDetailVM();
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                var parameter = new DynamicParameters();
                p.Add("@ID", maSP);
                p.Add("@TABLE", "SANPHAMLOAI");
                sanPhamLoai = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

                parameter.Add("@MaSP", maSP);
                var lstBL = connection.Query<BinhLuanVM>("SP_LAYBINHLUANSP", parameter, commandType: CommandType.StoredProcedure);
                if (lstBL != null)
                {
                    foreach (var bl in lstBL)
                    {
                        BinhLuanVM binhLuan = new BinhLuanVM();
                        binhLuan.MaBL = bl.MaBL;
                        binhLuan.TaiKhoan = bl.TaiKhoan;
                        binhLuan.NgayTao = bl.NgayTao;
                        binhLuan.DanhGia = bl.DanhGia;
                        binhLuan.NoiDung = bl.NoiDung;

                        sanPham.binhLuan.Add(binhLuan);
                    }
                }
                var lstSP = connection.Query<SanPhamLoai>("SELECT * FROM SANPHAM_LOAI WHERE MaLoaiSP='" + sanPhamLoai.MaLoaiSP + "'", commandType: CommandType.Text);
                if (lstSP != null)
                {
                    foreach (var sp in lstSP)
                    {
                        SanPhamLoai spTuongTu = new SanPhamLoai();
                        spTuongTu.MaSP = sp.MaSP;
                        spTuongTu.HinhAnh = sp.HinhAnh;
                        spTuongTu.DonGia = sp.DonGia;
                        spTuongTu.TenSP = sp.TenSP;
                        spTuongTu.SoLuongTon = sp.SoLuongTon;
                        spTuongTu.MoTa = sp.MoTa;
                        spTuongTu.MaNCC = sp.MaNCC;
                        spTuongTu.MaNSX = sp.MaNSX;
                        spTuongTu.HinhAnh = sp.HinhAnh;
                        spTuongTu.LuotBC = sp.LuotBC;
                        spTuongTu.LuotXem = sp.LuotXem;
                        spTuongTu.SPMoi = sp.SPMoi;
                        spTuongTu.TrangThai = sp.TrangThai;


                        sanPham.spTuongTu.Add(spTuongTu);
                    }
                }

            }
            if (sanPhamLoai == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product is not exist!");
                return response.Content;
            }
            sanPham.MaSP = sanPhamLoai.MaSP;
            sanPham.TenSP = sanPhamLoai.TenSP;
            sanPham.DonGia = sanPhamLoai.DonGia;
            sanPham.SoLuongTon = sanPhamLoai.SoLuongTon;
            sanPham.MoTa = sanPhamLoai.MoTa;
            sanPham.MaNCC = sanPhamLoai.MaNCC;
            sanPham.MaNSX = sanPhamLoai.MaNSX;
            sanPham.HinhAnh = sanPhamLoai.HinhAnh;

            return sanPham;
        }

        public async Task<dynamic> themSanPhamLoai(SanPhamLoai sanPhamLoai)
        {
            string hinhAnh = LoaiBoKyTu.bestLower(sanPhamLoai.TenSP) + "-" + LoaiBoKyTu.bestLower(sanPhamLoai.MaSP) + "." + sanPhamLoai.HinhAnh.Split('.')[sanPhamLoai.HinhAnh.Split('.').Length - 1];
            hinhAnh = hostImage + hinhAnh;
            try
            {
                using (var connection = new SqlConnection(connectionstr))
                {
                  
                    var p = new DynamicParameters();
                    p.Add("@MaSP", sanPhamLoai.MaSP);
                    p.Add("@TenSP", sanPhamLoai.TenSP);
                    p.Add("@DonGia", sanPhamLoai.DonGia);
                    p.Add("@SoLuongTon", sanPhamLoai.SoLuongTon);
                    p.Add("@HinhAnh", hinhAnh);
                    p.Add("@MoTa", sanPhamLoai.MoTa);
                    p.Add("@MaNCC", sanPhamLoai.MaNCC);
                    p.Add("@MaNSX", sanPhamLoai.MaNSX);
                    p.Add("@MaLoaiSP", sanPhamLoai.MaLoaiSP);
                    p.Add("@TrangThai", sanPhamLoai.TrangThai);
                    p.Add("@SPMoi", sanPhamLoai.SPMoi);

                    var p2 = new DynamicParameters();
                    p2.Add("@ID", sanPhamLoai.MaSP);
                    p2.Add("TABLE", "SANPHAMLOAI");
                   var sanPhamCN = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p2, commandType: CommandType.StoredProcedure);
                
                    if (sanPhamCN != null)
                    {
                        var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product was exist!");
                        return response.Content;
                    }

                    connection.Query<SanPhamLoai>("SANPHAMLOAI_INSERT", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "UnSuitable Value!");
                return response.Content;
            }
            return "success";

        }
        public async Task<IEnumerable<BinhLuanVM>> layDSBinhLuan(string maSP)
        {
            IEnumerable<BinhLuanVM> binhLuan = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@MaSP", maSP);
                binhLuan = connection.Query<BinhLuanVM>("SP_LAYBINHLUANSP", p, commandType: CommandType.StoredProcedure);
            }
            return binhLuan;
        }

        public async Task<dynamic> suaSanPhamLoai(SanPhamLoai sanPhamLoai)
        {
            SanPhamLoai sanPhamCN;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", sanPhamLoai.MaSP);
                p.Add("TABLE", "SANPHAMLOAI");
                sanPhamCN = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            }
            if (sanPhamCN == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product ID not exist!");
                return response.Content;
            }
            try
            {
                string hinhAnh = LoaiBoKyTu.bestLower(sanPhamLoai.TenSP) + "-" + LoaiBoKyTu.bestLower(sanPhamLoai.MaSP) + "." + sanPhamLoai.HinhAnh.Split('.')[sanPhamLoai.HinhAnh.Split('.').Length - 1];
                hinhAnh = hostImage + hinhAnh;
                using (var connection = new SqlConnection(connectionstr))
                {
                    var p = new DynamicParameters();
                    p.Add("@MaSP", sanPhamLoai.MaSP);
                    p.Add("@TenSP", sanPhamLoai.TenSP);
                    p.Add("@DonGia", sanPhamLoai.DonGia);
                    p.Add("@SoLuongTon", sanPhamLoai.SoLuongTon);
                    p.Add("@HinhAnh", hinhAnh);
                    p.Add("@MoTa", sanPhamLoai.MoTa);
                    p.Add("@LuotXem", sanPhamLoai.LuotXem);
                    p.Add("@LuotBC", sanPhamLoai.LuotBC);
                    p.Add("@SoLanMua", sanPhamLoai.SoLanMua);
                    p.Add("@MaNCC", sanPhamLoai.MaNCC);
                    p.Add("@MaNSX", sanPhamLoai.MaNSX);
                    p.Add("@MaLoaiSP", sanPhamLoai.MaLoaiSP);
                    p.Add("@TrangThai", sanPhamLoai.TrangThai);
                    p.Add("@SPMoi", sanPhamLoai.SPMoi);

                    connection.Query<SanPhamLoai>("SANPHAMLOAI_UPDATE", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "UnSuitable Value!");
                return response.Content;
            }
            return sanPhamLoai;
        }


        public async Task<dynamic> xoaSanPhamLoai(String MaSP)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", MaSP);
                p.Add("@TABLE", "SANPHAMLOAI");
                connection.Query("SP_DELETE", p, commandType: CommandType.StoredProcedure);
            }
            return "success";
        }

        public async Task<IEnumerable<LoaiSanPham>> layDSLoaiSanPham()
        {
            IEnumerable<LoaiSanPham> dsLoaiSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                dsLoaiSP = connection.Query<LoaiSanPham>("SELECT * FROM LOAISANPHAM", commandType: CommandType.Text);
            }
            return dsLoaiSP;
        }

        public async Task<dynamic> chiTietSanPhamAD(string maSP)
        {
            SanPhamLoai sanPhamLoai = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                var parameter = new DynamicParameters();
                p.Add("@ID", maSP);
                p.Add("@TABLE", "SANPHAMLOAI");
                sanPhamLoai = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

                parameter.Add("@MaSP", maSP);
                
            }
            if (sanPhamLoai == null)
            {
                var responsex = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product not exist!");
                return responsex.Content;
            }

            return sanPhamLoai;
        }

        public async Task<IEnumerable<SanPhamLoai>> layDSSanPhamMoi()
        {
            IEnumerable<SanPhamLoai> dsSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                dsSP = connection.Query<SanPhamLoai>("SELECT * FROM SANPHAM_LOAI WHERE SPMoi= 1 and TrangThai=1", commandType: CommandType.Text);
            }
            return dsSP;
        }
         public async Task<IEnumerable<SanPhamLoai>> layDSSanPhamTheoLoai(string maLoai)
        {
            IEnumerable<SanPhamLoai> dsSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                dsSP = connection.Query<SanPhamLoai>("SELECT * FROM SANPHAM_LOAI WHERE maLoaiSP= '"+maLoai+"' AND TrangThai=1", commandType: CommandType.Text);
            }
            return dsSP;
        }

       
        public async Task<IEnumerable<SanPhamKhuyenMai>> layDSSanPhamKM()
        {
            DateTime now = DateTime.Now;
            Console.WriteLine("Now is " + now);
            string ngay = now.ToString();
            IEnumerable<SanPhamKhuyenMai> dsSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@Ngay", ngay);
                string query = @"select SP.MaSP, SP.HinhAnh, SP.TenSP, SP.DonGia, " +
                    "SP.LuotBC, SP.LuotXem, SP.MaLoaiSP, SP.MaNCC, SP.MaNSX , SP.MoTa, SP.SoLanMua,SP.TrangThai, " +
                    "SP.SoLuongTon, SP.SPMoi, CT.GiamGia " +
                    "from SANPHAM_LOAI SP INNER JOIN CHITIETKHUYENMAI CT  " +
                    "ON SP.MaSP  = CT.MaSP " +
                    "INNER JOIN KHUYENMAI KM " +
                    "ON KM.MaKM = CT.MaKM " +
                    "WHERE  '" + ngay+
                    "'BETWEEN KM.NgayBD AND KM.NgayKT  and KM.TrangThai = 1";
                dsSP = connection.Query<SanPhamKhuyenMai>(query, commandType: CommandType.Text);
            }
            return dsSP;
        }

        public class LoaiBoKyTu
        {
            public static string bestLower(string input)
            {
                input = input.Trim();
                for (int i = 0x20; i < 0x30; i++)
                {
                    input = input.Replace(((char)i).ToString(), " ");
                }
                input = input.Replace(".", "-");
                input = input.Replace(" ", "-");
                input = input.Replace(",", "-");
                input = input.Replace(";", "-");
                input = input.Replace(":", "-");
                input = input.Replace("  ", "-");
                Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
                string str = input.Normalize(NormalizationForm.FormD);
                string str2 = regex.Replace(str, string.Empty).Replace('đ', 'd').Replace('Đ', 'D');
                while (str2.IndexOf("?") >= 0)
                {
                    str2 = str2.Remove(str2.IndexOf("?"), 1);
                }
                while (str2.Contains("--"))
                {
                    str2 = str2.Replace("--", "-").ToLower();
                }
                return str2.ToLower();
            }
        }
    }
}
