using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    public class ThongKeDoanhThu
    {
        public ThongKeBanHang thongKeBanHang = new ThongKeBanHang();
        public ThongKeNhapHang thongKeNhapHang = new ThongKeNhapHang();
        public int tongDoanhThu { get; set; }
    }
    public class ThongKeBanHang
    {
        public List<DonDatHang> dsDonDatHang = new List<DonDatHang>();
        public int tongTien { get; set; }
    }
    public class ThongKeNhapHang
    {
        public List<PhieuNhap> dsNhapHang = new List<PhieuNhap>();
        public int tongTien { get; set; }
    }
}
