using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models.ViewModels
{
    public class ChiTietKhuyenMaiVM
    {
        public int MaKM { get; set; }
        public string Code { get; set; }
        public string NgayBD { get; set; }
        public string NgayKT { get; set; }
        public string MoTa { get; set; }
        public bool TrangThai { get; set; }
        public int MaNV { get; set; }
        public int giamGia { get; set; }
        public List<SanPhamKM> DSSanPhamKM = new List<SanPhamKM>();
    }
    public class KhuyenMaiInsertVM
    {
        public string Code { get; set; }
        public string NgayBD { get; set; }
        public string NgayKT { get; set; }
        public string MoTa { get; set; }
        public bool TrangThai { get; set; }
        public int MaNV { get; set; }
        public List<SanPhamKMInsert> dsSanPhamKM = new List<SanPhamKMInsert>();

    }
    public class KhuyenMaiUpdateVM
    {
        public int MaKM { get; set; }
        public string Code { get; set; }
        public string NgayBD { get; set; }
        public string NgayKT { get; set; }
        public string MoTa { get; set; }
        public int MaNV { get; set; }
        //public int giamGia { get; set; }
        public List<SanPhamKMInsert> dsSanPhamKM = new List<SanPhamKMInsert>();
    }
}
