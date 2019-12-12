using Dapper;
using ShopOnlineBackEnd_Data.Models;
using ShopOnlineBackEnd_Data.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace ShopOnlineBackEnd_Data.Repositories
{
    public interface IThongKeBanHangRepository
    {
        Task<dynamic> thongKeDoanhThu(string ngayBD, string ngayKT);
        Task<dynamic> thongKeDoanhThuTheoNam(string nam);
        Task<dynamic> thongKeNhapHangTheoNam(string nam);
    }
    public class ThongKeBanHangRepository : IThongKeBanHangRepository
    {
        private readonly string connectionstr;

        public ThongKeBanHangRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<dynamic> thongKeDoanhThuTheoNam(string nam)
        {
            //ThongKeDoanhThu thongKe = new ThongKeDoanhThu();
            using (var connection = new SqlConnection(connectionstr))
            {
                IEnumerable<chiphiThang> dsDoanhThu = null;
                string query = @"select DATEPART(Month, NgayDat) thang,  SUM(DonGia) tongTien from CHITIETDONDATHANG CT
                                INNER JOIN DONDATHANG DDH ON CT.MaDDH = DDH.MaDDH   WHERE DATEPART(Year, NgayDat)='" + nam + @"' AND TinhTrang=1
                                GROUP BY DATEPART(Year, NgayDat),DATEPART(Month, NgayDat)
                                ORDER BY  Thang ";
                dsDoanhThu = await connection.QueryAsync<chiphiThang>(query, commandType: CommandType.Text);
                chiphiThang[] ds = new chiphiThang[12];
                for (int i = 0; i < 12; i++)
                {
                    ds[i] = new chiphiThang();
                    ds[i].thang = (i + 1).ToString();
                    ds[i].tongTien = 0;
                }
                foreach (var item in dsDoanhThu)
                {
                    ds[int.Parse(item.thang) - 1] = item;
                }
                return ds;
            }

        }
        public async Task<dynamic> thongKeNhapHangTheoNam(string nam)
        {
            //ThongKeDoanhThu thongKe = new ThongKeDoanhThu();
            IEnumerable<chiphiThang> dsNhapHang = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                string query = @"select DATEPART(Month, NgayTao) thang,  SUM(DonGia) tongTien from CHITIETPHIEUNHAP CT
                                INNER JOIN PHIEUNHAP PN ON CT.MaPN = PN.MaPN  WHERE DATEPART(Year, NgayTao)='"+nam+ @"'
                                GROUP BY DATEPART(Year, NgayTao),DATEPART(Month, NgayTao)
                                ORDER BY  Thang ";
                dsNhapHang = await connection.QueryAsync<chiphiThang>(query, commandType: CommandType.Text);
                chiphiThang[] ds = new chiphiThang[12];
                for(int i=0; i<12; i++)
                {
                    ds[i] = new chiphiThang();
                    ds[i].thang = (i + 1).ToString();
                    ds[i].tongTien = 0;
                }
                foreach(var item in dsNhapHang)
                {
                    ds[int.Parse(item.thang)-1] = item;
                }

                return ds;
            }

        }

        public async Task<dynamic> thongKeDoanhThu(string ngayBD, string ngayKT)
        {
            ThongKeDoanhThu thongKe = new ThongKeDoanhThu();
            int tongBanHang = 0;
            int tongNhapHang = 0;

            using (var connection = new SqlConnection(connectionstr))
            {
                List<DonDatHang> danhSachDDH = new List<DonDatHang>();
                string queryListDDH = @"SELECT DDH.MaDDH, NgayDat,NgayXuLy, TrangThai, MaKH, MaNV, TinhTrang, DiaChiNhan, TenNguoiNhan, SoDT, Email,SUM(CT.DonGia) AS TongTien
				                        FROM DONDATHANG DDH  FULL JOIN CHITIETDONDATHANG CT 
				                        ON DDH.MaDDH = CT.MaDDH
				                        WHERE DDH.TinhTrang=1 and NgayDat between '" + ngayBD + "' and '" + ngayKT + @"'
				                        GROUP BY 
				                        DDH.MaDDH, DDH.NgayDat, DDH.NgayXuLy, DDH.TrangThai, DDH.MaKH, DDH.MaNV, DDH.TinhTrang, DDH.TinhTrang, DDH.DiaChiNhan,DDH.TenNguoiNhan, DDH.SoDT,DDH.Email
			                            ORDER BY DDH.NgayDat DESC";
                var dsDonDatHang = connection.Query<DonDatHang>(queryListDDH, commandType: CommandType.Text);


                if (dsDonDatHang != null)
                {
                    string query = @"SELECT DDH.MaDDH, CT.MaSeri,  DonGia 
	                                FROM DONDATHANG DDH  FULL JOIN CHITIETDONDATHANG CT 
					                                ON DDH.MaDDH = CT.MaDDH
					                                INNER JOIN SANPHAM SP 
					                                ON  SP.MaSeri = CT.MaSeri
	                                WHERE DDH.TinhTrang=1 and NgayDat between '" + ngayBD + "' and '" + ngayKT + @"'
	                                GROUP BY CT.MaSeri, DDH.NgayDat, DDH.MaDDH, CT.DonGia";
                    var lisDsDonDatHang = connection.Query<SanPhamSeriDDH>(query, commandType: CommandType.Text);
                    if (lisDsDonDatHang != null)
                    {

                        foreach (var item in lisDsDonDatHang)
                        {
                            SanPhamSeriDDH donDat = new SanPhamSeriDDH();
                            donDat.MaDDH = item.MaDDH;
                            donDat.MaSeri = item.MaSeri;
                            donDat.DonGia = item.DonGia;

                            //  tongBanHang += item.DonGia;

                            string query2 = @"SELECT CT.DonGia
	                                        FROM PHIEUNHAP DDH  FULL JOIN CHITIETPHIEUNHAP CT 
	                                        ON DDH.MaPN = CT.MaPN
	                                        INNER JOIN SANPHAM SP 
	                                        ON  SP.MaSeri = CT.MaSeri
	                                        WHERE SP.MaSeri='" + item.MaSeri + @"'
	                                        GROUP BY 
	                                        CT.MaSeri, CT.DonGia";

                            var tienNhap = await connection.QuerySingleOrDefaultAsync<int>(query2, commandType: CommandType.Text);
                            tongNhapHang += tienNhap;
                        }

                        //  thongKe.thongKeBanHang.tongTien = tongBanHang;
                        //   thongKe.thongKeNhapHang.tongTien = tongNhapHang;
                    }


                    foreach (var item in dsDonDatHang)
                    {
                        DonDatHang donDat = new DonDatHang();
                        donDat.MaDDH = item.MaDDH;
                        donDat.MaKH = item.MaKH;
                        donDat.NgayXuLy = item.NgayXuLy;
                        donDat.MaNV = item.MaNV;
                        donDat.NgayDat = item.NgayDat;
                        donDat.SoDT = item.SoDT;
                        donDat.TenNguoiNhan = item.TenNguoiNhan;
                        donDat.TinhTrang = item.TinhTrang;
                        donDat.TrangThai = item.TrangThai;
                        donDat.TongTien = item.TongTien;
                        donDat.DiaChiNhan = item.DiaChiNhan;
                        donDat.Email = item.Email;

                        danhSachDDH.Add(donDat);
                        tongBanHang += item.TongTien;


                    }
                    thongKe.thongKeBanHang.dsDonDatHang = danhSachDDH;
                    thongKe.thongKeBanHang.tongTien = tongBanHang;
                }
                List<PhieuNhap> danhSachPN = new List<PhieuNhap>();

                string queryListPN = @"SELECT PN.MaPN, NgayTao, TrangThai, (SELECT TenNCC FROM NHACUNGCAP  NCC WHERE NCC.MaNCC = PN.MaNCC ) as MaNCC, MaNV, MaCode, SUM(CT.DonGia) AS TongTien
	                                    FROM PHIEUNHAP PN  FULL JOIN CHITIETPHIEUNHAP CT 
	                                    ON PN.MaPN = CT.MaPN
	                                    WHERE TrangThai =1 and NgayTao between  '" + ngayBD + "' and '" + ngayKT + @"'
	                                    GROUP BY 
	                                    PN.MaPN, PN.NgayTao, PN.TrangThai, PN.MaNCC, PN.MaNV, PN.MaCode
	                                    ORDER BY PN.MaPN DESC ";
                var dsPhieuNhap = connection.Query<PhieuNhap>(queryListPN, commandType: CommandType.Text);

                if (dsPhieuNhap != null)
                {

                    foreach (var item in dsPhieuNhap)
                    {
                        PhieuNhap phieuNhap = new PhieuNhap();
                        phieuNhap.MaCode = item.MaCode;
                        phieuNhap.MaPN = item.MaPN;
                        phieuNhap.MaNV = item.MaNV;
                        phieuNhap.MaNCC = item.MaNCC;
                        phieuNhap.NgayTao = item.NgayTao;
                        phieuNhap.TongTien = item.TongTien;
                        phieuNhap.TrangThai = item.TrangThai;

                        danhSachPN.Add(phieuNhap);
                        //   tongNhapHang += item.TongTien;


                    }
                    thongKe.thongKeNhapHang.dsNhapHang = danhSachPN;
                    thongKe.thongKeNhapHang.tongTien = tongNhapHang;

                }

                thongKe.tongDoanhThu = tongBanHang - tongNhapHang;
            }
            return thongKe;
        }
    }
}
