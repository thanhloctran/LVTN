using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models.ViewModels
{
    public class PhieuNhapInsertVM
    {
        public string MaCode { get; set; }
        public string NgayTao { get; set; }
        public int MaNV { get; set; }
        public string MaNCC { get; set; }
        public bool TrangThai { get; set; }

        public List<SanPhamLoaiNhap> dsSanPham = new List<SanPhamLoaiNhap>();


    }
    public class ChiTietPhieuNhapVM
    {
        public List<SanPhamLoaiPhieuNhap> DSSanPhamNhap = new List<SanPhamLoaiPhieuNhap>();
        public NguoiDungInforVM nhanVien = new NguoiDungInforVM();

        public int MaPN { get; set; }
        public string MaCode { get; set; }
        public string NgayTao { get; set; }
        public string MaNCC { get; set; }
        public int MaNV { get; set; }
        public bool TrangThai { get; set; }

        public float TongTien { get; set; }
    }
    public class SanPhamLoaiNhap
    {
        public string MaSP { get; set; }
        public float DonGia { get; set; }

        public List<string> dsSeriSanPham = new List<string>();
    }
    public class SanPhamLoaiPhieuNhap
    {
        public string MaSP { get; set; }
        public string tenSP { get; set; }
        public int SoLuong { get; set; }
        public float DonGia { get; set; }
        public List<string> dsSeriSanPham = new List<string>();
    }
    public class SanPhamNhap
    {
        public string MaSeri { get; set; }
    }

    
}
