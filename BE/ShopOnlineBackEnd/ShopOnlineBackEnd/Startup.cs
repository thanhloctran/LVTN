using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

using ShopOnlineBackEnd_Data.Repositories;
using ShopOnlineBackEnd.Controllers;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;
using SignalRChat.Hubs;
//using ShopOnlineBackEnd_Services;

namespace ShopOnlineBackEnd
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string dbconfig = "Server=FCK;Database=ShopOnline;User Id=sa;Password=123";
            //SERVICES
            services.AddTransient<IQuanLySanPhamRepository, QuanLySanPhamRepository>(f => new QuanLySanPhamRepository(dbconfig));
            services.AddTransient<IBinhLuanRepository, BinhLuanRepository>(f => new BinhLuanRepository(dbconfig));
            services.AddTransient<IKhuyenMaiRepository, KhuyenMaiRepository>(f => new KhuyenMaiRepository(dbconfig));
            services.AddTransient<IQuanLyDatHangRepository, QuanLyDatHangRepository>(f => new QuanLyDatHangRepository(dbconfig));
            services.AddTransient<IQuanLyNhapHangRepository, QuanLyNhapHangRepository>(f => new QuanLyNhapHangRepository(dbconfig));
            services.AddTransient<IQuanLyNguoiDungRepository, QuanLyNguoiDungRepository>(f => new QuanLyNguoiDungRepository(dbconfig));
            services.AddTransient<IQuanLyThongTinDTRepository, QuanLyThongTinDTRepository>(f => new QuanLyThongTinDTRepository(dbconfig));
            services.AddTransient<IThongKeBanHangRepository, ThongKeBanHangRepository>(f => new ThongKeBanHangRepository(dbconfig));


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "ShopOnline API", 
                    Description = "API Sample",
                    TermsOfService = "None"
                });
            });
            //cau hinh jwt
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtThanhLoc";
                options.DefaultChallengeScheme = "JwtThanhLoc";
            }).AddJwtBearer("JwtThanhLoc", jwtOptions => {
                jwtOptions.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    IssuerSigningKey = QuanLyNguoiDungController.SIGNING_KEY,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromDays(365)

                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins
                    (
                        "*"
                    ).AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopOnline API V1");
            });

            app.UseCors(builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());

            //khai bao su dung  quyen
            app.UseDirectoryBrowser(new DirectoryBrowserOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "images")),
                RequestPath = new PathString("/images")
            });


            app.UseAuthentication();
            //authen token
            app.UseStaticFiles();
            //service dependency
            app.UseSignalR(routes =>
            {
                routes.MapHub<Hubs>("/Hubs");
            });
            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Cart}/ {action=Index}/{id}"
                    );
            });

        }
    }
}
