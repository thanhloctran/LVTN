using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Text.RegularExpressions;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;

namespace ShopOnlineBackEnd_Data.Repositories
{
    public interface IQuanLySanPhamRepository
    {
        Task<List<SanPhamVM>> layDSSanPhamLoaiAD(string key);
        Task<List<SanPhamKhuyenMai>> layDSSanPhamCL(string key);
        Task<IEnumerable<SanPhamLoai>> layDSSanPham(string key);
        Task<dynamic> chiTietSanPham(string maSP);
        Task<dynamic> themSanPhamLoai(SanPhamLoai sanPhamLoai);
        Task<dynamic> suaSanPhamLoai(SanPhamLoai sanPhamLoai);
        Task<dynamic> xoaSanPhamLoai(string MaSP, string trangThai);
        Task<dynamic> chiTietSanPhamAD(string maSP);
        Task<IEnumerable<SanPhamLoai>> layDSSanPhamMoi();
        Task<IEnumerable<SanPhamLoai>> layDSSanPhamTheoLoai(string maLoai);
        Task<IEnumerable<SanPhamKhuyenMai>> layDSSanPhamKM();
        Task<IEnumerable<BinhLuanVM>> layDSBinhLuan(string maSP);
        Task<IEnumerable<LoaiSanPham>> layDSLoaiSanPham();
        Task<dynamic> chiTietSanPhamSeri(string maSeri);




    }
    public class QuanLySanPhamRepository : IQuanLySanPhamRepository
    {
       
        private readonly string connectionstr;
        ThongBaoLoi tbl = new ThongBaoLoi();
        private readonly string hostImage =  "https://localhost:44302/images/";

        public QuanLySanPhamRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<List<SanPhamVM>> layDSSanPhamLoaiAD(string key)
        {
            List<SanPhamVM> sanPham = new List<SanPhamVM>();
            IEnumerable<SanPhamLoai> sanPhamLoai = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@KEYWORD", key);
                p.Add("@TABLE", "SANPHAMLOAI");
                sanPhamLoai = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
                foreach(var item in sanPhamLoai)
                {
                    SanPhamVM sp = new SanPhamVM();
                    sp.DonGia = item.DonGia;
                    sp.HinhAnh = item.HinhAnh;
                    sp.MaSP = item.MaSP;
                    sp.SoLuongTon = item.SoLuongTon;
                    sp.TrangThai = item.TrangThai;
                    sp.TenSP = item.TenSP;

                    sanPham.Add(sp);
                }

            }
            return sanPham;
        }

        public async Task<IEnumerable<SanPhamLoai>> layDSSanPham(string key)
        {
            IEnumerable<SanPhamLoai> dsSanPham = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@KEYWORD", key);
                p.Add("@TABLE", "SANPHAMLOAI");
                dsSanPham = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
            }
            return dsSanPham;
        }

        public async Task<List<SanPhamKhuyenMai>> layDSSanPhamCL(string key)
        {
            List<SanPhamKhuyenMai> dsSanPhamBig = new List<SanPhamKhuyenMai>();
            using (var connection = new SqlConnection(connectionstr))
            {
                IEnumerable<SanPhamLoai> dsSanPham = null;
                var p = new DynamicParameters();
                p.Add("@KEYWORD", key);
                p.Add("@TABLE", "SANPHAMLOAI");
                DateTime now = DateTime.Now;
                //Console.WriteLine("Now is " + now);
                string ngay = now.ToString();

                dsSanPham = connection.Query<SanPhamLoai>("SP_GETALL", p, commandType: CommandType.StoredProcedure);
                foreach (var item in dsSanPham)
                {

                    string query = @"select  CT.GiamGia 
                    from CHITIETKHUYENMAI CT inner join KHUYENMAI KM
                    ON  CT.MaKM = KM.MaKM 
                    WHERE '" + ngay +"' BETWEEN KM.NgayBD AND KM.NgayKT AND CT.MaSP = '"+item.MaSP+"' AND TrangThai = 1 " ;

                   int giamGia = connection.QuerySingleOrDefault<int>(query, commandType: CommandType.Text);
                    if (giamGia == null)
                    {
                        giamGia = 0;
                    }
                    SanPhamKhuyenMai sp = new SanPhamKhuyenMai();
                    sp.MaSP = item.MaSP;
                    sp.TenSP = item.TenSP;
                    sp.DonGia = item.DonGia;
                    sp.SoLuongTon = item.SoLuongTon;
                    sp.HinhAnh = item.HinhAnh;
                    sp.MoTa = item.MoTa;
                    sp.LuotXem = item.LuotXem;
                    sp.LuotBC = item.LuotBC;
                    sp.SoLanMua = item.SoLanMua;
                    sp.MaNCC = item.MaNCC;
                    sp.MaNSX = item.MaNSX;
                    sp.MaLoaiSP = item.MaLoaiSP;
                    sp.TrangThai = item.TrangThai;
                    sp.SPMoi = item.SPMoi;
                    sp.GiamGia = giamGia;


                    dsSanPhamBig.Add(sp);
                }
            }
            return dsSanPhamBig;
        }

        public async Task<dynamic> chiTietSanPham(string maSP)
        {
            SanPhamLoai sanPhamLoai = null;
            SanPhamDetailVM sanPham = new SanPhamDetailVM();
            int giamGia;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                var parameter = new DynamicParameters();
                p.Add("@ID", maSP);
                p.Add("@TABLE", "SANPHAMLOAI");
                sanPhamLoai = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

                //parameter.Add("@MaSP", maSP);
                //var lstBL = connection.Query<BinhLuanVM>("SP_LAYBINHLUANSP", parameter, commandType: CommandType.StoredProcedure);
                //if (lstBL != null)
                //{
                //    foreach (var bl in lstBL)
                //    {
                //        BinhLuanVM binhLuan = new BinhLuanVM();
                //        binhLuan.MaBL = bl.MaBL;
                //        binhLuan.TaiKhoan = bl.TaiKhoan;
                //        binhLuan.NgayTao = bl.NgayTao;
                //        binhLuan.DanhGia = bl.DanhGia;
                //        binhLuan.NoiDung = bl.NoiDung;

                //        sanPham.binhLuan.Add(binhLuan);
                //    }
                //}
                var lstSP = connection.Query<SanPhamLoai>("SELECT * FROM SANPHAM_LOAI WHERE MaLoaiSP='" + sanPhamLoai.MaLoaiSP + "' AND TrangThai=1", commandType: CommandType.Text);
                if (lstSP != null)
                {
                    foreach (var sp in lstSP)
                    {
                        SanPhamLoai spTuongTu = new SanPhamLoai();
                        spTuongTu.MaSP = sp.MaSP;
                        spTuongTu.MaLoaiSP = sp.MaLoaiSP;
                        spTuongTu.HinhAnh = sp.HinhAnh;
                        spTuongTu.DonGia = sp.DonGia;
                        spTuongTu.TenSP = sp.TenSP;
                        spTuongTu.SoLuongTon = sp.SoLuongTon;
                        spTuongTu.MoTa = sp.MoTa;
                        spTuongTu.MaNCC = sp.MaNCC;
                        spTuongTu.MaNSX = sp.MaNSX;
                        spTuongTu.HinhAnh = sp.HinhAnh;
                        spTuongTu.LuotBC = sp.LuotBC;
                        spTuongTu.LuotXem = sp.LuotXem;
                        spTuongTu.SPMoi = sp.SPMoi;
                        spTuongTu.TrangThai = sp.TrangThai;
                    

                        sanPham.spTuongTu.Add(spTuongTu);
                    }
                }
                DateTime now = DateTime.Now;
                string ngay = now.ToString();
                string query = @"select  CT.GiamGia 
                    from CHITIETKHUYENMAI CT inner join KHUYENMAI KM
                    ON  CT.MaKM = KM.MaKM 
                    WHERE '" + ngay + "' BETWEEN KM.NgayBD AND KM.NgayKT AND CT.MaSP = '" + maSP + "' AND TrangThai = 1 ";

                giamGia = connection.QuerySingleOrDefault<int>(query, commandType: CommandType.Text);
                if (giamGia == null)
                {
                    giamGia = 0;
                }

            }
            if (sanPhamLoai == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product is not exist!");
                return response.Content;
            }

            sanPham.MaSP = sanPhamLoai.MaSP;
            sanPham.luotBC = sanPhamLoai.LuotBC;
            sanPham.TenSP = sanPhamLoai.TenSP;
            sanPham.GiaGoc = sanPhamLoai.DonGia;
            sanPham.DonGia = sanPhamLoai.DonGia - (sanPhamLoai.DonGia*giamGia/100);
            sanPham.SoLuongTon = sanPhamLoai.SoLuongTon;
            sanPham.MoTa = sanPhamLoai.MoTa;
            sanPham.MaNCC = sanPhamLoai.MaNCC;
            sanPham.MaNSX = sanPhamLoai.MaNSX;
            sanPham.HinhAnh = sanPhamLoai.HinhAnh;
            sanPham.giamGia = giamGia;

         //   List<DSBinhLuanMaSP> result = ;
            sanPham.binhLuan = await this.layDSBinhLuanSP(maSP);
            return sanPham;
        }

        public async Task<dynamic> themSanPhamLoai(SanPhamLoai sanPhamLoai)
        {
            string hinhAnh = LoaiBoKyTu.bestLower(sanPhamLoai.TenSP) + "-" + LoaiBoKyTu.bestLower(sanPhamLoai.MaSP) + "." + sanPhamLoai.HinhAnh.Split('.')[sanPhamLoai.HinhAnh.Split('.').Length - 1];
            hinhAnh = hostImage + hinhAnh;
            try
            {
                using (var connection = new SqlConnection(connectionstr))
                {
                  
                    var p = new DynamicParameters();
                    p.Add("@MaSP", sanPhamLoai.MaSP);
                    p.Add("@TenSP", sanPhamLoai.TenSP);
                    p.Add("@DonGia", sanPhamLoai.DonGia);
                    p.Add("@SoLuongTon", sanPhamLoai.SoLuongTon);
                    p.Add("@HinhAnh", hinhAnh);
                    p.Add("@MoTa", sanPhamLoai.MoTa);
                    p.Add("@MaNCC", sanPhamLoai.MaNCC);
                    p.Add("@MaNSX", sanPhamLoai.MaNSX);
                    p.Add("@MaLoaiSP", sanPhamLoai.MaLoaiSP);
                    p.Add("@TrangThai", sanPhamLoai.TrangThai);
                    p.Add("@SPMoi", sanPhamLoai.SPMoi);

                    var p2 = new DynamicParameters();
                    p2.Add("@ID", sanPhamLoai.MaSP);
                    p2.Add("TABLE", "SANPHAMLOAI");
                   var sanPhamCN = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p2, commandType: CommandType.StoredProcedure);
                
                    if (sanPhamCN != null)
                    {
                        var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product was exist!");
                        return response.Content;
                    }

                    connection.Query<SanPhamLoai>("SANPHAMLOAI_INSERT", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "UnSuitable Value!");
                return response.Content;
            }
            return "success";

        }

        public async Task<IEnumerable<BinhLuanVM>> layDSBinhLuan(string maSP)
        {
            IEnumerable<BinhLuanVM> binhLuan = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@MaSP", maSP);
                binhLuan = connection.Query<BinhLuanVM>("SP_LAYBINHLUANSP", p, commandType: CommandType.StoredProcedure);
            }
            return binhLuan;
        }

        public async Task<dynamic> suaSanPhamLoai(SanPhamLoai sanPhamLoai)
        {
            SanPhamLoai sanPhamCN;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", sanPhamLoai.MaSP);
                p.Add("TABLE", "SANPHAMLOAI");
                sanPhamCN = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            }
            if (sanPhamCN == null)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product ID not exist!");
                return response.Content;
            }
            try
            {
                string hinhAnh = LoaiBoKyTu.bestLower(sanPhamLoai.TenSP) + "-" + LoaiBoKyTu.bestLower(sanPhamLoai.MaSP) + "." + sanPhamLoai.HinhAnh.Split('.')[sanPhamLoai.HinhAnh.Split('.').Length - 1];
                hinhAnh = hostImage + hinhAnh;
                using (var connection = new SqlConnection(connectionstr))
                {
                    var p = new DynamicParameters();
                    p.Add("@MaSP", sanPhamLoai.MaSP);
                    p.Add("@TenSP", sanPhamLoai.TenSP);
                    p.Add("@DonGia", sanPhamLoai.DonGia);
                    p.Add("@SoLuongTon", sanPhamLoai.SoLuongTon);
                    p.Add("@HinhAnh", hinhAnh);
                    p.Add("@MoTa", sanPhamLoai.MoTa);
                    p.Add("@LuotXem", sanPhamLoai.LuotXem);
                    p.Add("@LuotBC", sanPhamLoai.LuotBC);
                    p.Add("@SoLanMua", sanPhamLoai.SoLanMua);
                    p.Add("@MaNCC", sanPhamLoai.MaNCC);
                    p.Add("@MaNSX", sanPhamLoai.MaNSX);
                    p.Add("@MaLoaiSP", sanPhamLoai.MaLoaiSP);
                    p.Add("@TrangThai", sanPhamLoai.TrangThai);
                    p.Add("@SPMoi", sanPhamLoai.SPMoi);

                    connection.Query<SanPhamLoai>("SANPHAMLOAI_UPDATE", p, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "UnSuitable Value!");
                return response.Content;
            }
            return sanPhamLoai;
        }

        public async Task<dynamic> xoaSanPhamLoai(String MaSP, string trangThai)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@ID", MaSP);
                p.Add("@TABLE", "SANPHAMLOAI");
                p.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);
                connection.Query("SP_DELETE", p, commandType: CommandType.StoredProcedure);
                int result = p.Get<int>("Result");
                if (result == 0)
                {
                    return "This item in stock! Can not delete!";
                }
                else if (result == -1)
                {
                    return "Product is not exist";
                }
                else if (result == 2)
                {
                    return "Product was deleted";
                }
                List<SanPhamVM> dsSanPham = await this.layDSSanPhamLoaiAD(trangThai);
                return dsSanPham;
            }
            
        }

        public async Task<IEnumerable<LoaiSanPham>> layDSLoaiSanPham()
        {
            IEnumerable<LoaiSanPham> dsLoaiSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                dsLoaiSP = connection.Query<LoaiSanPham>("SELECT * FROM LOAISANPHAM", commandType: CommandType.Text);
            }
            return dsLoaiSP;
        }

        public async Task<dynamic> chiTietSanPhamAD(string maSP)
        {
            SanPhamLoai sanPhamLoai = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                var parameter = new DynamicParameters();
                p.Add("@ID", maSP);
                p.Add("@TABLE", "SANPHAMLOAI");
                sanPhamLoai = connection.QuerySingleOrDefault<SanPhamLoai>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

                parameter.Add("@MaSP", maSP);
                
            }
            if (sanPhamLoai == null)
            {
                var responsex = await tbl.TBLoi(ThongBaoLoi.Loi500, "Product not exist!");
                return responsex.Content;
            }

            return sanPhamLoai;
        }

        public async Task<IEnumerable<SanPhamLoai>> layDSSanPhamMoi()
        {
            IEnumerable<SanPhamLoai> dsSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                dsSP = connection.Query<SanPhamLoai>("SELECT * FROM SANPHAM_LOAI WHERE SPMoi= 1 and TrangThai=1 ORDER BY MaSP DESC", commandType: CommandType.Text);
            }
            return dsSP;
        }

        public async Task<IEnumerable<SanPhamLoai>> layDSSanPhamTheoLoai(string maLoai)
        {
            IEnumerable<SanPhamLoai> dsSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                dsSP = connection.Query<SanPhamLoai>("SELECT * FROM SANPHAM_LOAI WHERE maLoaiSP= '"+maLoai+"' AND TrangThai=1", commandType: CommandType.Text);
            }
            return dsSP;
        }

        public async Task<IEnumerable<SanPhamKhuyenMai>> layDSSanPhamKM()
        {
            DateTime now = DateTime.Now;
            Console.WriteLine("Now is " + now);
            string ngay = now.ToString();
            IEnumerable<SanPhamKhuyenMai> dsSP = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                var p = new DynamicParameters();
                p.Add("@Ngay", ngay);
                string query = @"select SP.MaSP, SP.HinhAnh, SP.TenSP, SP.DonGia, " +
                    "SP.LuotBC, SP.LuotXem, SP.MaLoaiSP, SP.MaNCC, SP.MaNSX , SP.MoTa, SP.SoLanMua,SP.TrangThai, " +
                    "SP.SoLuongTon, SP.SPMoi, CT.GiamGia " +
                    "from SANPHAM_LOAI SP INNER JOIN CHITIETKHUYENMAI CT  " +
                    "ON SP.MaSP  = CT.MaSP " +
                    "INNER JOIN KHUYENMAI KM " +
                    "ON KM.MaKM = CT.MaKM " +
                    "WHERE  '" + ngay+
                    "'BETWEEN KM.NgayBD AND KM.NgayKT  and KM.TrangThai = 1";
                dsSP = connection.Query<SanPhamKhuyenMai>(query, commandType: CommandType.Text);
            }
            return dsSP;
        }
        //lay ds binh luan theo masp
        private async Task<List<DSBinhLuanMaSP>> layDSBinhLuanSP(string maSP)
        {
            List<DSBinhLuanMaSP> dsbinhLuanMaSP = new List<DSBinhLuanMaSP>();
            using (var connection = new SqlConnection(connectionstr))
            {
                var lstbinhLuan = connection.Query<BinhLuanDSVM>("select BL.MaBL, BL.DanhGia, BL.NoiDung, " +
                    "BL.NgayTao, TaiKhoan = (select TaiKhoan from NGUOIDUNG ND WHERE ND.MaND = BL.MaKH),  " +
                    "TenSP = (select SP.TenSP from SANPHAM_LOAI SP WHERE SP.MaSP = BL.MaSP)  from BINHLUAN BL WHERE BL.MaSP= '" + maSP + "' ORDER BY BL.MaBL DESC", commandType: CommandType.Text);
                foreach (var result in lstbinhLuan)
                {
                    DSBinhLuanMaSP dsbinhLuan = new DSBinhLuanMaSP();

                    BinhLuanDSVM chiTietBL = new BinhLuanDSVM();
                    chiTietBL.MaBL = result.MaBL;
                    chiTietBL.TenSP = result.TenSP;
                    chiTietBL.TaiKhoan = result.TaiKhoan;
                    chiTietBL.NoiDung = result.NoiDung;
                    chiTietBL.DanhGia = result.DanhGia;
                    chiTietBL.NgayTao = result.NgayTao;

                    dsbinhLuan.binhLuan = chiTietBL;

                    var lstBL = connection.Query<BinhLuanHoiDap>("SELECT * FROM TRALOIBL WHERE MaBL=" + result.MaBL, commandType: CommandType.Text);
                    if (lstBL != null)
                    {
                        foreach (var bl in lstBL)
                        {
                            BinhLuanHoiDap binhLuan = new BinhLuanHoiDap();
                            binhLuan.MaTL = bl.MaTL;
                            binhLuan.MaBL = bl.MaBL;
                            binhLuan.MaNV = bl.MaNV;
                            binhLuan.NgayTao = bl.NgayTao;
                            binhLuan.NoiDung = bl.NoiDung;

                            dsbinhLuan.dsHoiDap.Add(binhLuan);
                        }
                    }
                    dsbinhLuanMaSP.Add(dsbinhLuan);
                }

            }
            return dsbinhLuanMaSP;
        }

        public async Task<dynamic> chiTietSanPhamSeri(string maSeri)
        {
            
            SanPhamSeriWarranty sp = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                DetailSanPhamSeri detailSeri = new DetailSanPhamSeri();
                string query = @"SELECT SANPHAM.MaSeri , SANPHAM.MaSP,
                                (SELECT CHITIETDONDATHANG.MaDDH FROM CHITIETDONDATHANG INNER JOIN DONDATHANG 
                                 ON DONDATHANG.MaDDH = CHITIETDONDATHANG.MaDDH 
                                 WHERE CHITIETDONDATHANG.MaSeri = SANPHAM.MaSeri AND TrangThai=1) AS MaDDH ,
                                (SELECT CHITIETPHIEUNHAP.MaPN FROM CHITIETPHIEUNHAP WHERE CHITIETPHIEUNHAP.MaSeri = SANPHAM.MaSeri) AS MaPN 

                                FROM SANPHAM WHERE MaSeri='" + maSeri + "' AND TrangThai=0";

                sp = await connection.QueryFirstOrDefaultAsync<SanPhamSeriWarranty>(query, commandType: CommandType.Text);
                if (sp == null)
                {
                    return "This seri is uncorrect! Please check again!";
                }
                detailSeri.sp = sp;

                ChiTietDonDatHangVM  ctDDH = await this.chiTietDonDatHangAD(sp.MaDDH);
                detailSeri.ddh = ctDDH;

                ChiTietPhieuNhapVM ctPN = await this.chiTietPhieuNhapAD(sp.MaPN);
                detailSeri.pn = ctPN;

                IEnumerable<BaoHanh> dsbh = null;
                string query2 = @"SELECT * FROM BAOHANH BH WHERE TrangThai !=-1 AND MaSeri='" + maSeri + "' ORDER BY NgayTao ";
                dsbh = await connection.QueryAsync<BaoHanh>(query2, commandType: CommandType.Text);
                if (dsbh != null)
                {
                    foreach(var item in dsbh)
                    {
                        BaoHanh bh = new BaoHanh();
                        bh.MaBH = item.MaBH;
                        bh.MaNV = item.MaNV;
                        bh.MaSeri = item.MaSeri;
                        bh.NgayTao = item.NgayTao;
                        bh.TrangThai = item.TrangThai;
                        bh.NoiDung = item.NoiDung;

                        detailSeri.dsBH.Add(bh);
                    }
                }

                return detailSeri;
            }
            
        }
        private async Task<ChiTietDonDatHangVM> chiTietDonDatHangAD(int MaDDH)
        {

            var connection = new SqlConnection(connectionstr);
            string queryGroupByDDH = "SELECT  SP.MaSP, (SELECT SPL.TenSP From SANPHAM_LOAI SPL" +
                " WHERE SPL.MaSP = SP.MaSP) as TenSP,COUNT(SP.MaSP)AS SoLuong, CTDDH.DonGia " +
                "FROM CHITIETDONDATHANG CTDDH " +
                "LEFT JOIN SANPHAM SP ON CTDDH.MaSeri = SP.MaSeri  " +
                "WHERE MaDDH=" + MaDDH + " GROUP BY MaSP, DonGia";
            var chiTiet = connection.Query<SanPhamDDH>(queryGroupByDDH, commandType: CommandType.Text);


            var p = new DynamicParameters();
            p.Add("@ID", MaDDH);
            p.Add("@TABLE", "DONDATHANG");
            DonDatHang donDatHang = connection.QuerySingleOrDefault<DonDatHang>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);
            if (donDatHang == null)
            {
              //  var response = await tbl.TBLoi(ThongBaoLoi.Loi500, "Order is not exist");
                return null;
            }
            string queryND = "select TaiKhoan, HoTen, Email, SoDT, DiaChi  from NGUOIDUNG where MaND =" + donDatHang.MaKH;
            NguoiDungInforVM khachHang = connection.QuerySingleOrDefault<NguoiDungInforVM>(queryND, commandType: CommandType.Text);
            string queryNV = "select TaiKhoan, HoTen, Email, SoDT, DiaChi  from NGUOIDUNG where MaND =" + donDatHang.MaNV;
            NguoiDungInforVM nhanVien = connection.QuerySingleOrDefault<NguoiDungInforVM>(queryNV, commandType: CommandType.Text);
            ChiTietDonDatHangVM ct = new ChiTietDonDatHangVM();

            ct.MaDDH = MaDDH;
            ct.NgayXuLy = donDatHang.NgayXuLy;
            ct.NgayDat = donDatHang.NgayDat;
            ct.TrangThai = donDatHang.TrangThai;
            ct.TinhTrang = donDatHang.TinhTrang;
            ct.DiaChiNhan = donDatHang.DiaChiNhan;
            ct.TenNguoiNhan = donDatHang.TenNguoiNhan;
            ct.Email = donDatHang.Email;
            ct.SoDT = donDatHang.SoDT;
            ct.TongTien = 0;
            ct.khachHang = khachHang;
            ct.nhanVien = nhanVien;

            //int idND = donDatHang.MaKH;

            foreach (var item in chiTiet)
            {

                SanPhamDDH itemOrder = new SanPhamDDH();
                itemOrder.MaSP = item.MaSP;
                itemOrder.tenSP = item.tenSP;
                itemOrder.SoLuong = item.SoLuong;
                itemOrder.DonGia = item.DonGia;
                ct.TongTien += (itemOrder.SoLuong * itemOrder.DonGia);

                ct.DSSanPhamDDH.Add(itemOrder);

            }
            return ct;

        }
        private async Task<ChiTietPhieuNhapVM> chiTietPhieuNhapAD(int maPN)
        {
            var connection = new SqlConnection(connectionstr);
            string queryGroupByDDH = @"SELECT  SP.MaSP, (SELECT SPL.TenSP From SANPHAM_LOAI SPL
                WHERE SPL.MaSP = SP.MaSP) as TenSP,COUNT(SP.MaSP)AS SoLuong, CTDDH.DonGia 
                FROM CHITIETPHIEUNHAP CTDDH 
                LEFT JOIN SANPHAM SP ON CTDDH.MaSeri = SP.MaSeri  
               WHERE MaPN=" + maPN + " GROUP BY MaSP, DonGia";
            var chiTiet = connection.Query<SanPhamDDH>(queryGroupByDDH, commandType: CommandType.Text);


            var p = new DynamicParameters();
            p.Add("@ID", maPN);
            p.Add("@TABLE", "PHIEUNHAP");
            PhieuNhap phieuNhap = connection.QuerySingleOrDefault<PhieuNhap>("SP_GETDETAILBYID", p, commandType: CommandType.StoredProcedure);

            string queryND = "select TaiKhoan, HoTen, Email, SoDT, DiaChi  from NGUOIDUNG where MaND =" + phieuNhap.MaNV;
            NguoiDungInforVM nhanVien = connection.QuerySingleOrDefault<NguoiDungInforVM>(queryND, commandType: CommandType.Text);
            ChiTietPhieuNhapVM ct = new ChiTietPhieuNhapVM();

            ct.MaPN = maPN;
            ct.MaCode = phieuNhap.MaCode;
            ct.TrangThai = phieuNhap.TrangThai;
            ct.MaNCC = phieuNhap.MaNCC;
            ct.MaNV = phieuNhap.MaNV;
            ct.NgayTao = phieuNhap.NgayTao;
            ct.TongTien = phieuNhap.TongTien;
            ct.nhanVien = nhanVien;

            foreach (var item in chiTiet)
            {

                SanPhamLoaiPhieuNhap itemPN = new SanPhamLoaiPhieuNhap();
                itemPN.MaSP = item.MaSP;
                itemPN.tenSP = item.tenSP;
                itemPN.SoLuong = item.SoLuong;
                itemPN.DonGia = item.DonGia;
                string querySeri = "select CT.MaSeri from CHITIETPHIEUNHAP CT " +
                    "INNER JOIN SANPHAM SP ON CT.MaSeri = SP.MaSeri " +
                    "where MaPN = " + maPN + " and SP.MaSP ='" + item.MaSP + "'";
                var sp = await connection.QueryAsync<string>(querySeri, commandType: CommandType.Text);
                foreach (var spnhap in sp)
                {
                    itemPN.dsSeriSanPham.Add(spnhap);
                }

                ct.TongTien += (itemPN.SoLuong * itemPN.DonGia);
                ct.DSSanPhamNhap.Add(itemPN);

            }
            return ct;

        }
        public class LoaiBoKyTu
        {
            public static string bestLower(string input)
            {
                input = input.Trim();
                for (int i = 0x20; i < 0x30; i++)
                {
                    input = input.Replace(((char)i).ToString(), " ");
                }
                input = input.Replace(".", "-");
                input = input.Replace(" ", "-");
                input = input.Replace(",", "-");
                input = input.Replace(";", "-");
                input = input.Replace(":", "-");
                input = input.Replace("  ", "-");
                Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
                string str = input.Normalize(NormalizationForm.FormD);
                string str2 = regex.Replace(str, string.Empty).Replace('đ', 'd').Replace('Đ', 'D');
                while (str2.IndexOf("?") >= 0)
                {
                    str2 = str2.Remove(str2.IndexOf("?"), 1);
                }
                while (str2.Contains("--"))
                {
                    str2 = str2.Replace("--", "-").ToLower();
                }
                return str2.ToLower();
            }
        }
    }
}
