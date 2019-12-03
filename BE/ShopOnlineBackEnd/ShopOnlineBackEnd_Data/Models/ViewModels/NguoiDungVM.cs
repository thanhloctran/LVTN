using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models.ViewModels
{
    public class NguoiDungVM
    {
        public string TaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public string HoTen { get; set; }
        public int CMND { get; set; }
        public string NgaySinh { get; set; }
        public string Email { get; set; }
        public string SoDT { get; set; }
        public string DiaChi { get; set; }
        public string LoaiND { get; set; }
    }
    public class NguoiDungInforVM
    {
        public string TaiKhoan { get; set; }
        public string HoTen { get; set; }
        public string Email { get; set; }
        public string SoDT { get; set; }
        public string DiaChi { get; set; }
    }
}
