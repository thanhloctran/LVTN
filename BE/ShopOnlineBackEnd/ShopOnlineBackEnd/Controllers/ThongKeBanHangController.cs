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
    public class ThongKeBanHangController : ControllerBase
    {
        public IThongKeBanHangRepository _thongKeBanHangRepository;
        public ThongKeBanHangController(IThongKeBanHangRepository thongKeBanHangRepository)
        {
            _thongKeBanHangRepository = thongKeBanHangRepository;
        }
        [HttpGet("ThongKeDoanhThu")]
        public async Task<ActionResult> thongKeDoanhThu(string ngayBD, string ngayKT)
        {
            dynamic result = await _thongKeBanHangRepository.thongKeDoanhThu(ngayBD, ngayKT);
            return Ok(result);
        }
        [HttpGet("ThongKeBanHang")]
        public async Task<ActionResult> thongKeBanHang(string nam)
        {
            dynamic result = await _thongKeBanHangRepository.thongKeDoanhThuTheoNam(nam);
            return Ok(result);
        }
        [HttpGet("ThongKeNhapHang")]
        public async Task<ActionResult> ThongKeNhapHang(string nam)
        {
            dynamic result = await _thongKeBanHangRepository.thongKeNhapHangTheoNam(nam);
            return Ok(result);
        }
        [HttpGet("LayDanhSachBaoHanh")]
        public async Task<ActionResult> layDSBaoHanh(int trangThai)
        {
            IEnumerable<BaoHanh> result = await _thongKeBanHangRepository.layDanhSachBaoHanh(trangThai);
            return Ok(result);
        }
        [HttpGet("LayChiTietBaoHanh")]
        public async Task<ActionResult> layChiTietBH(int maBH)
        {
            dynamic result = await _thongKeBanHangRepository.layChiTietBaoHanh(maBH);
            return Ok(result);
        }
        [HttpPost("ThemBaoHanh")]
        public async Task<IActionResult> themBaoHanh(BaoHanh baoHanh)
        {
            dynamic result = await _thongKeBanHangRepository.themBaoHanh(baoHanh);
            return Ok(result);
        }
        [HttpPut("CapNhatThongTinBaoHanh")]
        public async Task<IActionResult> capnhat(BaoHanh baoHanh)
        {
            dynamic result = await _thongKeBanHangRepository.capNhatBaoHanh(baoHanh);
            return Ok(result);
        }

    }
}