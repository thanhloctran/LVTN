using Dapper;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace ShopOnlineBackEnd_Data.Repositories
{
    
    public interface IQuanLyNguoiDungRepository
    {
        Task<dynamic> dangNhap(ThongTinDangNhap thongtinDN);
        Task<dynamic> dangKy(NguoiDungVM ngDung);
        Task<IEnumerable<NguoiDung>> layDanhSachNguoiDung(string MaLoaiND);
        Task<IEnumerable<LoaiNguoiDung>> layDanhSachLoaiNguoiDung();
        Task<IEnumerable<NguoiDung>> timKiemNguoiDung(string MaLoaiND, string key);
        Task<dynamic> thongTinNguoiDung(string taiKhoan);
        Task<dynamic> capNhatThongTinNguoiDung(NguoiDung nguoiDung);
        Task<dynamic> xoaNguoiDung(String taiKhoan);



    }
    public class QuanLyNguoiDungRepository : IQuanLyNguoiDungRepository
    {
        private readonly string connectionstr;
        private const string SECRET_KEY = "0123456789123456";//Khóa bí mật
        public static readonly SymmetricSecurityKey SIGNING_KEY = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECRET_KEY));
        ThongBaoLoi tbl = new ThongBaoLoi();
        public QuanLyNguoiDungRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }

        public async Task<dynamic> dangKy(NguoiDungVM nguoiDung)
        {
            int nd;
            var p = new DynamicParameters();
            try
            {
                using (var connection = new SqlConnection(connectionstr))
                {
                    p.Add("@TaiKhoan", nguoiDung.TaiKhoan);
                    p.Add("@MatKhau", nguoiDung.MatKhau);
                    p.Add("@CMND", nguoiDung.CMND);
                    p.Add("@HoTen", nguoiDung.HoTen);
                    p.Add("@NgaySinh", nguoiDung.NgaySinh);
                    p.Add("@Email", nguoiDung.Email);
                    p.Add("@SoDT", nguoiDung.SoDT);
                    p.Add("@DiaChi", nguoiDung.DiaChi);
                    p.Add("@LoaiND", nguoiDung.LoaiND);
                    p.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                    nd = connection.QuerySingleOrDefault<int>("SP_DANGKY", p, commandType: CommandType.StoredProcedure);
                }
                int result = p.Get<int>("Result");
                if (result == 1)
                {
                    var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account Name is exist!");
                    return response.Content;
                }
                if (result == 2)
                {
                    var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Type of user is unsuitable!");
                    return response.Content;
                }
                return "success";

            }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Value wrong!");
                return response.Content;
            }

        }

        public async Task<dynamic> dangNhap(ThongTinDangNhap thongtinDN)
        {
            NguoiDung ngDung;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@TaiKhoan", thongtinDN.TaiKhoan);
                p.Add("@MatKhau", thongtinDN.MatKhau);
                ngDung = connection.QuerySingleOrDefault<NguoiDung>("SP_DANGNHAP", p, commandType: CommandType.StoredProcedure);
            }
            if (ngDung != null)
            {
               
                NguoiDungDangNhap nguoiDungDN = new NguoiDungDangNhap
                {
                    MaND = ngDung.MaND,
                    TaiKhoan = ngDung.TaiKhoan,
                    HoTen = ngDung.HoTen,
                    DiaChi = ngDung.DiaChi,
                    Email = ngDung.Email,
                    NgaySinh = ngDung.NgaySinh,
                    SoDT = ngDung.SoDT,
                    MaLoaiND = ngDung.LoaiND,
            };
                string accessToken = GenerateToken(nguoiDungDN);
                nguoiDungDN.accessToken = accessToken;
                return nguoiDungDN;
            }
            var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account name or Password is wrong!");
            return response.Content;
        }
        private string GenerateToken(NguoiDungDangNhap ndDN)
        {
            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                    claims: new Claim[] {
                        new Claim(ClaimTypes.Name,ndDN.TaiKhoan),
                        new Claim(ClaimTypes.Role,ndDN.MaLoaiND),

                    },
                    notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                    expires: new DateTimeOffset(DateTime.Now.AddMinutes(60)).DateTime,
                    signingCredentials: new SigningCredentials(SIGNING_KEY, SecurityAlgorithms.HmacSha256)


                );

            //string token1 = new JwtSecurityTokenHandler().WriteToken(token);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public async Task<IEnumerable<NguoiDung>> layDanhSachNguoiDung(string MaLoaiND)
        {
            IEnumerable<NguoiDung> nguoiDung = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@LOAIND", MaLoaiND);
                p.Add("@KEYWORD", "NULL");
                nguoiDung = connection.Query<NguoiDung>("SP_LAYDSNGUOIDUNG", p, commandType: CommandType.StoredProcedure);
            }
            return nguoiDung;
        }


        public async Task<IEnumerable<LoaiNguoiDung>> layDanhSachLoaiNguoiDung()
        {
            IEnumerable<LoaiNguoiDung> result = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                result = connection.Query<LoaiNguoiDung>("SELECT * FROM LOAIND", commandType: CommandType.Text);
            }
            return result;
        }


        public async Task<IEnumerable<NguoiDung>> timKiemNguoiDung(string MaLoaiND, string key)
        {
            IEnumerable<NguoiDung> nguoiDung = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@LOAIND", MaLoaiND);
                p.Add("@KEYWORD", key);
                p.Add("@PAGE", 1);
                p.Add("@PERPAGE", 100);
                nguoiDung = connection.Query<NguoiDung>("SP_LAYDSNGUOIDUNG", p, commandType: CommandType.StoredProcedure);
            }
            return nguoiDung;
        }


        public async Task<dynamic> capNhatThongTinNguoiDung(NguoiDung nguoiDung)
        {
            //NguoiDung nguoiDungCapNhat;
            //using (var connection = new SqlConnection(connectionstr))
            //{
            //    var p = new DynamicParameters();
            //    p.Add("@ID", nguoiDung.TaiKhoan);
            //    p.Add("TABLE", "NGUOIDUNG");
            //    nguoiDungCapNhat = connection.QuerySingleOrDefault<NguoiDung>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            //}
            //if (nguoiDungCapNhat == null)
            //{
            //    var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account is not exist!");
            //    return response;
            //}
            try
            {
                using (var connection = new SqlConnection(connectionstr))
                {
                    var p = new DynamicParameters();
                    p.Add("@MaND", nguoiDung.MaND);
                    p.Add("@TaiKhoan", nguoiDung.TaiKhoan);
                    p.Add("@MatKhau", nguoiDung.MatKhau);
                    p.Add("@HoTen", nguoiDung.HoTen);
                    p.Add("@CMND", nguoiDung.CMND);
                    p.Add("@NgaySinh", nguoiDung.NgaySinh);
                    p.Add("@Email", nguoiDung.Email);
                    p.Add("@SoDT", nguoiDung.SoDT);
                    p.Add("@DiaChi", nguoiDung.DiaChi);
                    p.Add("@TrangThai", nguoiDung.TrangThai);

                    connection.Query("NGUOIDUNG_UPDATE", p, commandType: CommandType.StoredProcedure);
                }
        }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "UnSuitable Value!");
                return response;
            }
            return nguoiDung;
        }

        public async Task<dynamic> xoaNguoiDung(String maND)
        {
            NguoiDung nguoiDungCapNhat;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", maND);
                p.Add("TABLE", "NGUOIDUNG");
                nguoiDungCapNhat = connection.QuerySingleOrDefault<NguoiDung>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            }
            if (nguoiDungCapNhat == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account is not exist!");
                return response;
            }
            try
            {
                var p = new DynamicParameters();
                using (var connection = new SqlConnection(connectionstr))
                {

                    p.Add("@ID", nguoiDungCapNhat.MaND);
                    p.Add("TABLE", "NGUOIDUNG");
                    p.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                    connection.Query("SP_DELETE", p, commandType: CommandType.StoredProcedure);

                    int result = p.Get<int>("Result");
                    if (result == 0)
                    {
                        return "success";
                    }
                    if (result == -1)
                    {
                        var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account is not exist!");
                        return response.Content;
                    }
                    if (result == 2)
                    {
                        var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account was deleted!");
                        return response.Content;
                    }
                }
            }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Error!");
                return response.Content;
            }
            return "success";


        }

        public async Task<dynamic> thongTinNguoiDung(string taiKhoan)
        {
            NguoiDung thongTinND;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", taiKhoan);
                p.Add("TABLE", "NGUOIDUNG");
                thongTinND = connection.QuerySingleOrDefault<NguoiDung>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            }
            if (thongTinND == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Account is not exist!");
                return response.Content;
            }

            return thongTinND;
        }


    }
}
