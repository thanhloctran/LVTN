using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopOnlineBackEnd_Data;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;
using ShopOnlineBackEnd_Data.Repositories;
using static ShopOnlineBackEnd_Data.Commons;

namespace ShopOnlineBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLySanPhamController : ControllerBase
    {
        ThongBaoLoi tbl = new ThongBaoLoi();
        public IQuanLySanPhamRepository _quanLySanPhamRepository;
        public QuanLySanPhamController(IQuanLySanPhamRepository quanLySanPhamRepository)
        {
            _quanLySanPhamRepository = quanLySanPhamRepository;
        }
        [HttpGet("LayDanhSachSanPhamAdmin")]
        public async Task<IActionResult> LayDanhSachSanPhamLoai(string key = "null")
        {
            List<SanPhamVM> result = await _quanLySanPhamRepository.layDSSanPhamLoaiAD(key);
            return Ok(result);
        }
        [HttpGet("LayDanhSachSanPhamClient")]
        public async Task<IActionResult> LayDanhSachSanPham(string key = "1")
        {
            IEnumerable<SanPhamKhuyenMai> result = await _quanLySanPhamRepository.layDSSanPhamCL(key);
            return Ok(result);
        }
        [HttpGet("LayChiTietSanPhamClient")]
        public async Task<IActionResult> ChiTietSanPham(string maSP)
        {
            dynamic result = await _quanLySanPhamRepository.chiTietSanPham(maSP);
            return Ok(result);
        }
        [HttpGet("LayChiTietSanPhamAdmin")]
        public async Task<IActionResult> ChiTietSanPhamAD(string maSP)
        {
            dynamic result = await _quanLySanPhamRepository.chiTietSanPhamAD(maSP);
            return Ok(result);
        }
        [HttpGet("LayDanhSachSanPhamMoi")]
        public async Task<IActionResult> layDSSanPhamMoi()
        {
            IEnumerable<SanPhamLoai>  result = await _quanLySanPhamRepository.layDSSanPhamMoi();
            return Ok(result);
        }
        [HttpGet("LayDanhSachSanPhamTheoLoai")]
        public async Task<IActionResult> layDSSanPhamTheoLoai(string maLoaiSP)
        {
            IEnumerable<SanPhamLoai> result = await _quanLySanPhamRepository.layDSSanPhamTheoLoai(maLoaiSP);
            return Ok(result);
        }
        [HttpGet("LayDanhSachSanPhamKhuyenMai")]
        public async Task<IActionResult> layDSSanPhamKM()
        {
            IEnumerable<SanPhamKhuyenMai> result = await _quanLySanPhamRepository.layDSSanPhamKM();
            return Ok(result);
        }
        [HttpGet("LayDanhSachBinhLuan")]
        public async Task<IActionResult> LayDSBinhLuan(string maSP)
        {
            dynamic result = await _quanLySanPhamRepository.layDSBinhLuan(maSP);
            return Ok(result);
        }

        [HttpGet("LayDanhSachLoaiSanPham")]
        public async Task<IActionResult> layDSLoaiSanPham()
        {
            IEnumerable<LoaiSanPham> result = await _quanLySanPhamRepository.layDSLoaiSanPham();
            return Ok(result);
        }
        [HttpPost("ThemSanPham")]
        public async Task<IActionResult> ThemSanPhamLoai(SanPhamLoai sanPhamLoai)
        {

            dynamic result = await _quanLySanPhamRepository.themSanPhamLoai(sanPhamLoai);
            return Ok(result);
        }

        [HttpPut("SuaThongTinSanPham")]
        public async Task<ActionResult> SuaSanPhamLoai(SanPhamLoai sanPhamLoaiChinhSua)
        {
            dynamic result = await _quanLySanPhamRepository.suaSanPhamLoai(sanPhamLoaiChinhSua);
            return Ok(result);
        }
        [HttpDelete("XoaSanPham")]
        public async Task<IActionResult> xoaSanPhamLoai(string MaSP)
        {
            dynamic result = await _quanLySanPhamRepository.xoaSanPhamLoai(MaSP);
            return Ok(result);
        }
        private const int TenMegaBytes = 1024 * 1024;

        [HttpPost("UploadHinhAnhSanPham")]
        public async Task<IActionResult> UploadHinhAnh()
        {
            IFormFile file = Request.Form.Files[0];
            string tenSP = Request.Form["tenSP"];
            string maSP = Request.Form["maSP"];
            tenSP = LoaiBoKyTu.bestLower(tenSP);
            maSP = LoaiBoKyTu.bestLower(maSP);

            if (file.Length > TenMegaBytes)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Dung lượng file vượt quá 1 MB!");
                return Ok("Dung lượng file vượt quá 1 MB!");

            }
            if (file.ContentType == "image/png" || file.ContentType == "image/jpeg" || file.ContentType == "image/jpg" || file.ContentType == "image/gif")
            {
                try
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", tenSP + "-" + maSP + "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1]);
                    var stream = new FileStream(path, FileMode.Create);
                    file.CopyTo(stream);
                    return Ok("success");
                }
                catch
                {
                    var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Upload file không thành công!");
                    return Ok("Upload file fail!");
                }
            }
            else
            {
                //return await tbl.TBLoi(ThongBaoLoi.Loi500, "Định dạng file không hợp lệ!");
                return Ok("File Fomat is unsuitable !");
            }



        }



    }
}
