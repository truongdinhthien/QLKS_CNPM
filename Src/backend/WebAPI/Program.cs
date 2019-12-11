using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Infrastructure.Persistence;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // DateTime start = new DateTime(2009, 6, 14,10,5,00);
            // DateTime end = new DateTime(2009, 6, 15,12,10,00);
            // TimeSpan difference = end - start;
            // int time = difference.Days * 24 + difference.Hours;
            // Console.WriteLine(time);
             var host = CreateHostBuilder(args).Build();
            using (var serviceScope = host.Services.CreateScope())
            {
                var services = serviceScope.ServiceProvider;
                try
                {
                    var hotelContext = services.GetRequiredService<HotelContext>();
                    SeedData.Initialize(hotelContext);
                }
                catch(Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex.ToString());
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
