using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Repositories;

namespace ShopOnlineBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLyThongTinDTController : ControllerBase
    {

        public IQuanLyThongTinDTRepository _quanLyThongTinDTRepository;
        public QuanLyThongTinDTController(IQuanLyThongTinDTRepository quanLyThongTinDTRepository)
        {
            _quanLyThongTinDTRepository = quanLyThongTinDTRepository;
        }
        [HttpGet("LayDanhSachNhaSanXuat")]
        public async Task<IActionResult> layDSNhaSX()
        {
            IEnumerable<NhaSanXuat> result = await _quanLyThongTinDTRepository.layDSNhaSX();
            return Ok(result);
        }
        [HttpGet("LayDanhSachNhaCungCap")]
        public async Task<IActionResult> layDSNhaCC()
        {
            IEnumerable<NhaCungCap> result = await _quanLyThongTinDTRepository.layDSNhaCC();
            return Ok(result);
        }
        [HttpPost("ThemNhaSanXuat")]
        public async Task<IActionResult> themNSX(NhaSanXuat nsx)
        {
            dynamic result = await _quanLyThongTinDTRepository.themNSX( nsx);
            return Ok(result);
        }
        [HttpPost("ThemNhaCungCap")]
        public async Task<IActionResult> themNCC(NhaCungCap ncc)
        {
            dynamic result = await _quanLyThongTinDTRepository.themNCC(ncc);
            return Ok(result);
        }
        [HttpGet("LayChiTietNhaSanXuat")]
        public async Task<IActionResult> layChiTietNhaSX(string maNSX)
        {
            NhaSanXuat result = await _quanLyThongTinDTRepository.layChiTietNhaSX(maNSX);
            return Ok(result);
        }
        [HttpGet("LayChiTietNhaCungCap")]
        public async Task<IActionResult> layDSNhaCC(string maNCC)
        {
            NhaCungCap result = await _quanLyThongTinDTRepository.layChiTietNhaCC(maNCC);
            return Ok(result);
        }
        [HttpPut("SuaThongTinNhaSanXuat")]
        public async Task<IActionResult> suaNSX(NhaSanXuat nsx)
        {
            dynamic result = await _quanLyThongTinDTRepository.suaNSX(nsx);
            return Ok(result);
        }
        [HttpPut("SuaThongTinNhaCungCap")]
        public async Task<IActionResult> suaNCC(NhaCungCap ncc)
        {
            dynamic result = await _quanLyThongTinDTRepository.suaNCC(ncc);
            return Ok(result);
        }
        [HttpDelete("XoaNhaCungCap")]
        public async Task<IActionResult> xoaNCC(string maNCC)
        {
            dynamic result = await _quanLyThongTinDTRepository.xoaNCC(maNCC);
            return Ok(result);
        }
    }
}