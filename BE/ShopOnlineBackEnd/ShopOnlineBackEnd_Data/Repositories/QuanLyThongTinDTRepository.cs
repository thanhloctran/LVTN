using Dapper;
using ShopOnlineBackEnd_Data.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
//QuanLyThongTinDTController

namespace ShopOnlineBackEnd_Data.Repositories
{
    public interface IQuanLyThongTinDTRepository
    {
        Task<IEnumerable<NhaSanXuat>> layDSNhaSX();
        Task<IEnumerable<NhaCungCap>> layDSNhaCC();
        Task<NhaSanXuat> layChiTietNhaSX(string maNSX);
        Task<NhaCungCap> layChiTietNhaCC(string maNCC);

        Task<dynamic> themNSX(NhaSanXuat nsx);
        Task<dynamic> themNCC(NhaCungCap ncc);
        Task<dynamic> suaNSX(NhaSanXuat nsx);
        Task<dynamic> suaNCC(NhaCungCap ncc);

        Task<dynamic> xoaNCC(string maNCC);
    }
    public class QuanLyThongTinDTRepository : IQuanLyThongTinDTRepository
    {
        private readonly string connectionstr;
        ThongBaoLoi tbl = new ThongBaoLoi();

        public QuanLyThongTinDTRepository(string connectionstr)
        {
            {
                this.connectionstr = connectionstr;
            }
        }
        public async Task<IEnumerable<NhaSanXuat>> layDSNhaSX()
        {
            IEnumerable<NhaSanXuat> result = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                result = connection.Query<NhaSanXuat>("SELECT * FROM NHASANXUAT", commandType: CommandType.Text);
            }
            return result;
        }

        public async Task<IEnumerable<NhaCungCap>> layDSNhaCC()
        {
            IEnumerable<NhaCungCap> result = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                result = connection.Query<NhaCungCap>("SELECT * FROM NHACUNGCAP", commandType: CommandType.Text);
            }
            return result;
        }

        public async Task<NhaSanXuat> layChiTietNhaSX(string maNSX)
        {
            NhaSanXuat result = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                result = connection.QuerySingleOrDefault<NhaSanXuat>("SELECT * FROM NHASANXUAT WHERE MaNSX='" + maNSX + "'", commandType: CommandType.Text);
            }
            return result;
        }

        public async Task<NhaCungCap> layChiTietNhaCC(string maNCC)
        {
            NhaCungCap result = null;
            using (var connection = new SqlConnection(connectionstr))
            {
                result = connection.QuerySingleOrDefault<NhaCungCap>("SELECT * FROM NHACUNGCAP WHERE MaNCC='" + maNCC + "'", commandType: CommandType.Text);
            }
            return result;
        }

        public async Task<dynamic> themNSX(NhaSanXuat nsx)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var insertNSX = @" INSERT INTO DBO.NHASANXUAT (MaNSX, TenNSX, ThongTin, HinhAnh)
	                                         VALUES (@MaNSX,@TenNSX, @ThongTin ,@HinhAnh )";
                var p = new DynamicParameters();
                p.Add("@MaNSX", nsx.MaNSX);
                p.Add("@TenNSX", nsx.TenNSX);
                p.Add("@ThongTin", nsx.ThongTin);
                p.Add("@HinhAnh", nsx.HinhAnh);

                await connection.ExecuteAsync(insertNSX, p);

            }
            return "success";
        }

        public async Task<dynamic> themNCC(NhaCungCap ncc)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var insertNCC = @" INSERT INTO DBO.NHACUNGCAP (MaNCC,TenNCC,  DiaChi, Email, Fax, TrangThaiXoa , SoDT)
	                                         VALUES (@MaNCC , @TenNCC, @DiaChi, @Email ,@Fax , 0 , @SoDT)";
                var p = new DynamicParameters();
                p.Add("@MaNCC", ncc.MaNCC);
                p.Add("@TenNCC", ncc.TenNCC);
                p.Add("@DiaChi", ncc.DiaChi);
                p.Add("@Email", ncc.Email);
                p.Add("@SoDT", ncc.SoDT);
                p.Add("@Fax", ncc.Fax);
                await connection.ExecuteAsync(insertNCC, p);

            }
            return "success";
        }

        public async Task<dynamic> suaNSX(NhaSanXuat nsx)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var updateNSX = @"UPDATE dbo.NHASANXUAT
                                    SET
                                        TenNSX = @TenNSX, 
                                        ThongTin= @ThongTin ,
                                        HinhAnh= @HinhAnh

                                    WHERE MaNSX = @MaNSX";
                var p = new DynamicParameters();
                p.Add("@MaNSX", nsx.MaNSX);
                p.Add("@TenNSX", nsx.TenNSX);
                p.Add("@ThongTin", nsx.ThongTin);
                p.Add("@HinhAnh", nsx.HinhAnh);

                await connection.ExecuteAsync(updateNSX, p);

            }
            return "success";
        }

        public async Task<dynamic> suaNCC(NhaCungCap ncc)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var updateNCC = @" UPDATE dbo.BINHLUAN
                                    SET
                                    DiaChi= @DiaChi, 
                                    Email=@Email ,
                                    Fax=@Fax ,
                                    TrangThaiXoa= @TrangThaiXoa

                                    WHERE MaNCC=  @MaNCC";
                var p = new DynamicParameters();
                p.Add("@MaNCC", ncc.MaNCC);
                p.Add("@DiaChi", ncc.DiaChi);
                p.Add("@Email", ncc.Email);
                p.Add("@Fax", ncc.Fax);
                p.Add("@TrangThaiXoa", ncc.TrangThaiXoa);

                await connection.ExecuteAsync(updateNCC, p);

            }
            return "success";
        }

        public async Task<dynamic> xoaNCC(string maNCC)
        {
            using (var connection = new SqlConnection(connectionstr))
            {
                var deleteNCC = " UPDATE dbo.BINHLUAN SET TrangThaiXoa= 1 WHERE MaNCC=  @MaNCC";
               
                await connection.ExecuteAsync(deleteNCC);

            }
            return "success";
        }
    }
}
