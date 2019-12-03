using ShopOnlineBackEnd_Data.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnlineBackEnd_Data.Models
{
    public class KhuyenMai
    {
        public int MaKM { get; set; }
        public string Code { get; set; }
        public string NgayBD { get; set; }
        public string NgayKT { get; set; }
        public string MoTa { get; set; }
        public bool TrangThai { get; set; }
        public int MaNV { get; set; }
    }

  
   
}