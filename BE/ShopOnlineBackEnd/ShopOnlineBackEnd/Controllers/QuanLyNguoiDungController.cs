using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;
using ShopOnlineBackEnd_Data.Repositories;


namespace ShopOnlineBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLyNguoiDungController : ControllerBase
    {
        public IQuanLyNguoiDungRepository _quanLyNguoiDungRepository;

        private const string SECRET_KEY = "0123456789123456";//Khóa bí mật
        public static readonly SymmetricSecurityKey SIGNING_KEY = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SECRET_KEY));
        ThongBaoLoi tbl = new ThongBaoLoi();

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
        public QuanLyNguoiDungController(IQuanLyNguoiDungRepository quanLyNguoiDungRepository)
        {
            _quanLyNguoiDungRepository = quanLyNguoiDungRepository;
        }
        [HttpPost("DangNhap")]
        public async Task<ActionResult> dangNhap(ThongTinDangNhap thongtin)
        {
            dynamic result = await _quanLyNguoiDungRepository.dangNhap(thongtin);
           return Ok(result);
            

        }
        [HttpPost("DangKy")]
        public async Task<ActionResult> dangKy(NguoiDungVM ngDung)
        {
            dynamic result = await _quanLyNguoiDungRepository.dangKy(ngDung);
            return Ok(result);
        }
        [HttpGet("LayDanhSachNguoiDung")]
        public async Task<ActionResult> layDSNguoiDung(string loaiND ="KH")
        {
            dynamic result = await _quanLyNguoiDungRepository.layDanhSachNguoiDung(loaiND);
            return Ok(result);


        }
        [HttpGet("LayDanhSachLoaiNguoiDung")]
        public async Task<ActionResult> layDSLoaiNguoiDung()
        {
            dynamic result = await _quanLyNguoiDungRepository.layDanhSachLoaiNguoiDung();
            return Ok(result);


        }

        [HttpGet("LayThongTinNguoiDung")]
        public async Task<ActionResult> layThongTinNguoiDung(string taiKhoan)
        {
            dynamic result = await _quanLyNguoiDungRepository.thongTinNguoiDung(taiKhoan);
            return Ok(result);


        }
        //[Authorize]
        [HttpPut("CapNhatThongTinNguoiDung")]
        public async Task<ActionResult> CapNhatThongTinNguoiDung(NguoiDung nguoiDung)
        {
            dynamic result = await _quanLyNguoiDungRepository.capNhatThongTinNguoiDung(nguoiDung);
            return Ok(result);


        }
        [Authorize(Roles = "NV")]
        [HttpDelete("XoaNguoiDung")]
        public async Task<ActionResult> XoaNguoiDung(string maND, string loaiND)
        {
            dynamic result = await _quanLyNguoiDungRepository.xoaNguoiDung(maND, loaiND);
            return Ok(result);


        }

    }
}
