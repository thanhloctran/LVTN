using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;
using ShopOnlineBackEnd_Data.Repositories;

namespace ShopOnlineBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhuyenMaiController : ControllerBase
    {
        public IKhuyenMaiRepository _khuyenMaiRepository;
        public KhuyenMaiController(IKhuyenMaiRepository khuyenMaiRepository)
        {

            _khuyenMaiRepository = khuyenMaiRepository;
        }

        [HttpGet("LayDanhSachKhuyenMai")]
        public async Task<IActionResult> LayDSKhuyenMai()
        {
            IEnumerable<KhuyenMai> result = await _khuyenMaiRepository.layDSKhuyenMai();
            return Ok(result);
        }

        [HttpGet("DanhSachSanPhamInsertKM")]
        public async Task<IActionResult> DanhSachSanPhamInsertKM()
        {
            List<SanPhamKM> result = await _khuyenMaiRepository.layDSSanPhamKMInsert();
            return Ok(result);
        }
        [HttpGet("LayChiTietKhuyenMai")]
        public async Task<IActionResult> ChiTietKhuyenMai(int MaKM)
        {
            dynamic result = await _khuyenMaiRepository.chiTietKhuyenMai(MaKM);
            return Ok(result);
        }
        [HttpPost("ThemKhuyenMai")]
        public async Task<IActionResult> ThemKhuyenMai(KhuyenMaiInsertVM khuyenMai)
        {

            dynamic result = await _khuyenMaiRepository.themKhuyenMai(khuyenMai);
            return Ok(result);
        }

        [HttpPut("SuaKhuyenMai")]
        public async Task<IActionResult> SuaKhuyenMai(KhuyenMaiUpdateVM khuyenMaiChinhSua)
        {
            dynamic result = await _khuyenMaiRepository.suaKhuyenMai(khuyenMaiChinhSua);
            return Ok(result);
        }

        [HttpDelete("XoaKhuyenMai")]
        public async Task<IActionResult> xoaKhuyenMai(string MaKM)
        {

            dynamic result = await _khuyenMaiRepository.xoaKhuyenMai(MaKM);
            return Ok(result);
        }

        [HttpGet("LayThongTinChiTietKhuyenMai")]
        public async Task<IActionResult> layThongTinKhuyenMai(int MaKM)
        {
            dynamic result = await _khuyenMaiRepository.layThongTinKhuyenMai(MaKM);
            return Ok(result);
        }
    }
}
