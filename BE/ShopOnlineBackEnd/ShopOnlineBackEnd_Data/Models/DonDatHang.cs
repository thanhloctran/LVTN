using ShopOnlineBackEnd_Data.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    public class DonDatHang
    {
        public int MaDDH { get; set; }
        public string NgayDat { get; set; }
        public string NgayXuLy { get; set; }
        public int TrangThai { get; set; }
        public int MaKH { get; set; }
        public int MaNV { get; set; }
        public int TinhTrang { get; set; }
        public string DiaChiNhan { get; set; }
        public string TenNguoiNhan { get; set; }
        public string SoDT{ get; set; }
        public string Email { get; set; }

        public int TongTien { get; set; }

    }
    
    
}