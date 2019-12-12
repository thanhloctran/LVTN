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
    public class BinhLuanController : ControllerBase
    {
        public IBinhLuanRepository _binhLuanRepository;
        public BinhLuanController(IBinhLuanRepository binhLuanRepository)
        {
            _binhLuanRepository = binhLuanRepository;
        }
        [HttpGet("LayDanhSachBinhLuan")]
        public async Task<ActionResult> LayDSBinhLuan()
        {
            IEnumerable<BinhLuanDSVM> result = await _binhLuanRepository.layDSBinhLuan();
            return Ok(result);
        }
        [HttpGet("LayChiTietBinhLuanAD")]
        public async Task<ActionResult> ChiTietBinhLuanAD(int MaBL)
        {
            dynamic result = await _binhLuanRepository.chiTietBinhLuanAD(MaBL);
            return Ok(result);
        }
        [HttpGet("LayChiTietBinhLuan")]
        public async Task<ActionResult> ChiTietBinhLuan(string MaBL)
        {
            BinhLuan result = await _binhLuanRepository.chiTietBinhLuan(MaBL);
            return Ok(result);
        }
        //[HttpGet("LayDanhSachBinhLuanTheoSanPham")]
        //public async Task<ActionResult> LayDSBinhLuanSP(string maSP)
        //{
        //    List<DSBinhLuanMaSP> result = await _binhLuanRepository.layDSBinhLuanSP(maSP);
        //    return Ok(result);
        //}
        [HttpPost("ThemTraLoiBinhLuan")]
        public async Task<ActionResult> TraLoiBinhLuan(BinhLuanHoiDap binhLuan)
        {
            dynamic result = await _binhLuanRepository.traLoiBinhLuan(binhLuan);
            return Ok(result);
        }
        [HttpPost("ThemBinhLuan")]
        public async Task<ActionResult> ThemBinhLuan(BinhLuan binhLuan)
        {
            dynamic result = await _binhLuanRepository.themBinhLuan(binhLuan);
            return Ok(result);
        }

        [HttpPut("SuaBinhLuan")]
        public async Task<ActionResult> SuaBinhLuan(BinhLuanUpdateVM binhLuanChinhSua)
        {
            dynamic result = await  _binhLuanRepository.suaBinhLuan(binhLuanChinhSua);
            return Ok(result);
        }
        [HttpDelete("XoaBinhLuan")]
        public async Task<ActionResult> xoaBinhLuan(string MaBL)
        {

            dynamic result = await _binhLuanRepository.xoaBinhLuan(MaBL);
            return Ok(result);
        }
       
        [HttpDelete("XoaTraLoiBinhLuan")]
        public async Task<ActionResult> xoaTraLoiBinhLuan(string MaCauTraLoi)
        {

            dynamic result = await _binhLuanRepository.xoaTraLoiBinhLuan(MaCauTraLoi);
            return Ok(result);
        }


    }
}
