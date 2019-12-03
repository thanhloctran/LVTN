using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    public class SanPhamLoai
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
    }
}
