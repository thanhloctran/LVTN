using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    public class PhieuNhap
    {
        public int MaPN { get; set; }
        public string MaCode { get; set; }
        public string NgayTao { get; set; }
        public string MaNCC { get; set; }
        public int MaNV { get; set; }
        public bool TrangThai { get; set; }

        public int TongTien { get; set; }
    }
}