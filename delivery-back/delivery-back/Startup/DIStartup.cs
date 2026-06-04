using delivery_back.Context;
using delivery_back.Filters;
using delivery_back.Mappings;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Startup
{
    public class DIStartup
    {
        public static void ConfigureServices(IHostApplicationBuilder builder)
        {
            #region DbContext

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString));

            #endregion DbContext

            #region AutoMapper

            builder.Services.AddAutoMapper(typeof(MappingProfile));

            #endregion AutoMapper

            #region Filters

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<ApiExceptionFilter>();
            });

            #endregion Filters
        }
    }
}
