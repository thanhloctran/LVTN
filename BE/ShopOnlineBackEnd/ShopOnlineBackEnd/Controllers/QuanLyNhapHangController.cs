using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;
using ShopOnlineBackEnd_Data.Repositories;

namespace ShopOnlineBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanLyNhapHangController : ControllerBase
    {
        public IQuanLyNhapHangRepository _phieuNhapRepository;
        public QuanLyNhapHangController(IQuanLyNhapHangRepository phieuNhapRepository)
        {
            _phieuNhapRepository = phieuNhapRepository;
        }
        [Authorize(Roles = "NV")]
        [HttpGet("LayDanhSachPhieuNhap")]
        public async Task<IActionResult> LayDSPhieuNhap(string key = "null")
        {
            IEnumerable<PhieuNhap> result = await _phieuNhapRepository.layDSPhieuNhap(key);
            return Ok(result);
        }
        //[HttpGet("LayChiTietPhieuNhap")]
        //public async Task<IActionResult> ChiTietPhieuNhap(string maPN)
        //{
        //    PhieuNhap result = await _phieuNhapRepository.chiTietPhieuNhap(maPN);
        //    return Ok(result);
        //}
        [HttpGet("LayChiTietPhieuNhapAD")]
        public async Task<IActionResult> ChiTietPhieuNhapAD(int maPN)
        {
            ChiTietPhieuNhapVM result =  await _phieuNhapRepository.chiTietPhieuNhapAD(maPN);
            return Ok(result);
        }

        [HttpPost("ThemPhieuNhap")]
        public async Task<IActionResult> ThemPhieuNhapAD(PhieuNhapInsertVM phieuNhap)
        {

            dynamic result = await _phieuNhapRepository.themPhieuNhapAD(phieuNhap);
            return Ok(result);
        }

        [HttpPut("SuaPhieuNhap")]
        public async Task<IActionResult> SuaPhieuNhap(PhieuNhap phieuNhapChinhSua)
        {
            dynamic result = await _phieuNhapRepository.suaPhieuNhap(phieuNhapChinhSua);
            return Ok(result);
        }
        [HttpDelete("XoaPhieuNhap")]
        public async Task<IActionResult> xoaPhieuNhap(string maPN)
        {

            dynamic result = await _phieuNhapRepository.xoaPhieuNhap(maPN);
            return Ok(result);
        }
        
    }
}
