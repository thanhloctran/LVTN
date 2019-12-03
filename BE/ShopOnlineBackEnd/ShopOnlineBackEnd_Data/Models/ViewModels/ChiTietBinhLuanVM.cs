using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models.ViewModels
{
    public class ChiTietBinhLuanVM
    {
        public NguoiDungInforVM KhachHang = new NguoiDungInforVM();
        public SanPhamVM SanPham = new SanPhamVM();

        public int MaBL { get; set; }
        public int DanhGia { get; set; }
        public string NoiDung { get; set; }
        public string NgayTao { get; set; }
        public string MaSP { get; set; }
        public int MaKH { get; set; }
        public List<BinhLuanHoiDap> dsHoiDap = new List<BinhLuanHoiDap>();


    }
    public class BinhLuanVM
    {
        public int MaBL { get; set; }
        public int DanhGia { get; set; }
        public string NoiDung { get; set; }
        public string TaiKhoan { get; set; }
        public string NgayTao { get; set; }

        //public List<BinhLuanHoiDap> dsHoiDap = new List<BinhLuanHoiDap>();
    }
    public class BinhLuanUpdateVM
    {
        public int MaBL { get; set; }
        public int DanhGia { get; set; }
        public string NoiDung { get; set; }
        public string NgayTao { get; set; }
    }

    public class BinhLuanDSVM
    {
        public int MaBL { get; set; }
        public string TaiKhoan { get; set; }
        public string TenSP { get; set; }
        public int DanhGia { get; set; }
        public string NoiDung { get; set; }
        public string NgayTao { get; set; }
    }


    public class DSBinhLuanMaSP
    {
        public BinhLuanDSVM binhLuan = new BinhLuanDSVM();
        public List<BinhLuanHoiDap> dsHoiDap = new List<BinhLuanHoiDap>();
    }

    public class BinhLuanHoiDap
    {
        public int MaTL { get; set; }
        public int MaBL { get; set; }
        public int MaNV { get; set; }
        public string NoiDung { get; set; }
        public string NgayTao { get; set; }
    }

}
