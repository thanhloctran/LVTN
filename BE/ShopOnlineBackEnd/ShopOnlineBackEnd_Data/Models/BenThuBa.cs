using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    //NHA CUNG CAP 
    public class NhaCungCap
    {
        public string MaNCC { get; set; }
        public string TenNCC { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string SoDT { get; set; }
        public string Fax { get; set; }
        public bool TrangThaiXoa { get; set; }
    }
    //NHA SAN XUAT
    public class NhaSanXuat
    {
        public string MaNSX { get; set; }
        public string TenNSX { get; set; }
        public string ThongTin { get; set; }
        public string HinhAnh { get; set; }
    }
}
