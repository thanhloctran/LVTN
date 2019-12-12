using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    public class ThongKeDoanhThu
    {
        public ThongKeBanHang thongKeBanHang = new ThongKeBanHang();
        public ThongKeNhapHang thongKeNhapHang = new ThongKeNhapHang();
        public float tongDoanhThu { get; set; }
    }
    public class ThongKeBanHang
    {
        public List<DonDatHang> dsDonDatHang = new List<DonDatHang>();
        public float tongTien { get; set; }
    }
    public class ThongKeNhapHang
    {
        public List<PhieuNhap> dsNhapHang = new List<PhieuNhap>();
        public float tongTien { get; set; }
    }
    public class chiphiThang {
        public string thang { get; set; }
        public float tongTien { get; set; }
    }
}
