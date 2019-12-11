using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Persistence;
using Core.Interfaces;
using Newtonsoft.Json;
using AutoMapper;
using Core.Mapping;
// using WebAPI.Services;
using Core.Services.Interfaces;


namespace WebAPI
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors (options => {
                options.AddPolicy (MyAllowSpecificOrigins,
                    builder => {
                        builder.WithOrigins (
                                "http://localhost:3006"
                            )
                            .AllowAnyHeader ()
                            .AllowAnyMethod ();
                    });
            });
            services.AddControllers ();
            services.AddControllers();
            services.AddDbContext<HotelContext>(options => options.UseSqlite("Data Source=Hotel.db"));
            services.AddMvc(option => option.EnableEndpointRouting = false)
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddAutoMapper(typeof(MappingProfile));

            services.AddScoped<IUnitOfWork, UnitOfWork> ();
            services.AddScoped<IRoomService, Core.Services.RoomService>();
            services.AddScoped<IRoomTypeService, Core.Services.RoomTypeService>();
            services.AddScoped<IEmployerService, Core.Services.EmployerService>();
            services.AddScoped<IServiceRoomService, Core.Services.ServiceRoomService>();
            services.AddScoped<ICustomerService, Core.Services.CustomerService>();
            services.AddScoped<IContractService, Core.Services.ContractService>();
            services.AddScoped<IContractDetailService, Core.Services.ContractDetailService>();
            services.AddScoped<IBillService, Core.Services.BillService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting ();

            // global cors policy
            app.UseCors (x => x
                .AllowAnyOrigin ()
                .AllowAnyMethod ()
                .AllowAnyHeader ()
                );

            app.UseAuthentication ();
            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });
        }
    }
}