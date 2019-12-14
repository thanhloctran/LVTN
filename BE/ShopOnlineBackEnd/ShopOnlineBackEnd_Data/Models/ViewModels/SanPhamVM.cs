using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models.ViewModels
{
    public class SanPhamDetailVM
    {
        public string MaSP { get; set; }
        public string TenSP { get; set; }
        public float DonGia { get; set; }
        public int SoLuongTon { get; set; }
        public string HinhAnh { get; set; }
        public string MoTa { get; set; }
        public string MaNCC { get; set; }
        public string MaNSX { get; set; }
        public int giamGia { get; set; }
        public float luotBC { get; set; }
        public float GiaGoc { get; set; }

        public List<DSBinhLuanMaSP> binhLuan = new List<DSBinhLuanMaSP>();
        public List<SanPhamLoai> spTuongTu = new List<SanPhamLoai>();
    }

    //san pham truong tu in detail
    public class SanPhamTT
    {
        public string MaSP { get; set; }
        public string HinhAnh { get; set; }
        public string TenSP { get; set; }
        public float DonGia { get; set; }
    }
    //san pham in danh sach
    public class SanPhamVM
    {
        public string MaSP { get; set; }
        public string HinhAnh { get; set; }
        public string TenSP { get; set; }
        public int TrangThai { get; set; }
        public int SoLuongTon { get; set; }
        public float DonGia { get; set; }
       
       
    }
    //san pham don dat hang view model
    public class sanPhamOrder
    {
        public string MaSP { get; set; }
        public string MaSeri { get; set; }
        public string TenSP { get; set; }
    }


    public class SanPhamSeriDDH
    {
        public int MaDDH { get; set; }
        public string MaSeri { get; set; }
        public float DonGia { get; set; }
    }
    //san pham kuyen mai view model
    public class SanPhamKMInsert
    {
        public string MaSP { get; set; }
        public int GiamGia { get; set; }
    }
    public class SanPhamKM
    {
        public string MaSP { get; set; }
        public string HinhAnh { get; set; }
        public string TenSP { get; set; }
        public int GiamGia { get; set; }
    }

    //Loại sản phẩm
    public class LoaiSanPhamVM
    {
        public string MaLoai { get; set; }
    }
    //sanPham giam gia
    public class SanPhamKhuyenMai
    {
        public string MaSP { get; set; }
        public string TenSP { get; set; }
        public float DonGia { get; set; }
        public int SoLuongTon { get; set; }
        public string HinhAnh { get; set; }
        public string MoTa { get; set; }
        public int LuotXem { get; set; }
        public float LuotBC { get; set; }
        public int SoLanMua { get; set; }
        public string MaNCC { get; set; }
        public string MaNSX { get; set; }
        public string MaLoaiSP { get; set; }
        public int TrangThai { get; set; }
        public bool SPMoi { get; set; }
        public int GiamGia { get; set; }
    }
    public class SanPhamSeriWarranty
    {
        public string MaSeri { get; set; }
        public string MaSP { get; set; }
        public int MaDDH { get; set; }
        public int MaPN { get; set; }
    }
    public class DetailSanPhamSeri
    {
        public SanPhamSeriWarranty sp = new SanPhamSeriWarranty();
        public ChiTietDonDatHangVM ddh = new ChiTietDonDatHangVM();
        public ChiTietPhieuNhapVM pn = new ChiTietPhieuNhapVM();
    }

}
