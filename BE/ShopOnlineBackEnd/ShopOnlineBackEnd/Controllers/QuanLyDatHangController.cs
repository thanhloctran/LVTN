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
    public class QuanLyDatHangController : ControllerBase
    {
        public IQuanLyDatHangRepository _donDatHangRepository;
        public QuanLyDatHangController(IQuanLyDatHangRepository donDatHangRepository)
        {
            _donDatHangRepository = donDatHangRepository;
        }
        [HttpGet("LayDanhSachDonDatHang")]
        //danh sach don dat hang da dat cho duyet trang thai =0
        public async Task<IActionResult> LayDSDonDatHang(string trangThai = "0")
        {
            IEnumerable<DonDatHang> result = await _donDatHangRepository.layDSDonDatHang(trangThai);
            return Ok(result);
        }

        [HttpGet("LayDanhSachDonDatHangTheoND")]
        //danh sach don dat hang da dat cho duyet trang thai =0
        public async Task<IActionResult> LayDSDonDatHangND(string taiKhoan, string trangThai = "0")
        {
            IEnumerable<DonDatHang> result = await _donDatHangRepository.layDSDonDatHangClient(taiKhoan, trangThai);
            return Ok(result);
        }
        [HttpGet("LayChiTietDonDatHang")]
        public async Task<IActionResult> chiTietDonDatHangAD(int MaDDH)
        {
            object result = await _donDatHangRepository.chiTietDonDatHangAD(MaDDH);
            return Ok(result);
        }

        //[HttpGet("")]
        //public async Task<IActionResult> ChiTietDonDatHang(string MaDDH)
        //{
        //    DonDatHang result = await _donDatHangRepository.chiTietDonDatHang(MaDDH);
        //    return Ok(result);
        //}
        [HttpPost("ThemDonDatHang")]
        public async Task<IActionResult> ThemDonDatHang(DonDatHangInsertVM donDatHang)
        {
           
            dynamic result = await _donDatHangRepository.themDonDatHang(donDatHang);
            return Ok(result);
        }

        [HttpPut("CapNhatTrangThaiDonHang")]
        public async Task<IActionResult> capNhatTrangThaiDonDatHang(DonDatHangUpdateStatus item)
        {
            dynamic result = await _donDatHangRepository.capNhatTrangThaiDonDatHang(item);
            return Ok(result);
        }
        [HttpDelete("XoaDonDatHang")]
        public async Task<IActionResult> xoaDonDatHang(string MaDDH)
        {

            dynamic result = await _donDatHangRepository.xoaDonDatHang(MaDDH);
            return Ok(result);
        }
        

    }
}
