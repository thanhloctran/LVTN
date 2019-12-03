using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models.ViewModels
{
    public class ChiTietDonDatHangVM
    {
        public List<SanPhamDDH> DSSanPhamDDH = new List<SanPhamDDH>();
        public NguoiDungInforVM khachHang = new NguoiDungInforVM();
        public int MaDDH { get; set; }
        public string NgayDat { get; set; }
        public string NgayXuLy { get; set; }
        public int TrangThai { get; set; }
        public int TinhTrang { get; set; }
        public float TongTien { get; set; }
        public string Email { get; set; }
        public string DiaChiNhan { get; set; }
        public string TenNguoiNhan { get; set; }
        public string SoDT { get; set; }
    }
    public class DonDatHangVM
    {
        public int MaDDH { get; set; }
        public string NgayDat { get; set; }
        public int TrangThai { get; set; }
        public int TinhTrang { get; set; }
        public float TongTien { get; set; }

    }
    public class DonDatHangInsertVM
    {
        public string NgayDat { get; set; }
        public int MaKH { get; set; }
        public int MaNV { get; set; }
        public int TinhTrang { get; set; }
        public string DiaChiNhan { get; set; }
        public string TenNguoiNhan { get; set; }
        public string SoDT { get; set; }
        public string Email { get; set; }

        public List<SanPhamDDH> dsSanPham = new List<SanPhamDDH>();
       


    }
    public class DonDatHangUpdateStatus
    {
        public int MaDDH { get; set; }
        public int MaNV { get; set; }
        public int TrangThai { get; set; }
        public string NgayXuLy { get; set; }
    }

    public class SanPhamDDH
    {
        public string MaSP { get; set; }
        public string tenSP { get; set; }
        public int SoLuong { get; set; }
        public float DonGia { get; set; }
    }


}
