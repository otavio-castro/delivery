using delivery_back.Context;
using delivery_back.Filters;
using delivery_back.Mappings;
using delivery_back.Repositories;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services;
using delivery_back.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Startup
{
    public class DIStartup
    {
        public static void ConfigureServices(IHostApplicationBuilder builder)
        {
            #region DbContext

            // Priorizar variável de ambiente DATABASE_URL (Render) ou CONNECTION_STRING
            var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
            string connectionString;

            if (!string.IsNullOrEmpty(databaseUrl))
            {
                // Converter DATABASE_URL (formato PostgreSQL URL) para Connection String do Npgsql
                connectionString = ConvertPostgresUrlToConnectionString(databaseUrl);
            }
            else
            {
                connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING")
                    ?? builder.Configuration.GetConnectionString("DefaultConnection")!;
            }

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString));

            #endregion DbContext

            #region AutoMapper

            builder.Services.AddAutoMapper(typeof(MappingProfile));

            #endregion AutoMapper

            #region Repositories

            builder.Services.AddScoped<IRestauranteRepository, RestauranteRepository>();
            builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();
            builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
            builder.Services.AddScoped<IEnderecoRepository, EnderecoRepository>();
            builder.Services.AddScoped<IEntregadorRepository, EntregadorRepository>();
            builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();
            builder.Services.AddScoped<IItemPedidoRepository, ItemPedidoRepository>();
            builder.Services.AddScoped<IPagamentoRepository, PagamentoRepository>();

            #endregion Repositories

            #region Services

            builder.Services.AddScoped<IRestauranteService, RestauranteService>();
            builder.Services.AddScoped<IProdutoService, ProdutoService>();
            builder.Services.AddScoped<IClienteService, ClienteService>();
            builder.Services.AddScoped<IEnderecoService, EnderecoService>();
            builder.Services.AddScoped<IEntregadorService, EntregadorService>();
            builder.Services.AddScoped<IPedidoService, PedidoService>();
            builder.Services.AddScoped<IItemPedidoService, ItemPedidoService>();
            builder.Services.AddScoped<IPagamentoService, PagamentoService>();

            #endregion Services

            #region Filters

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<ApiExceptionFilter>();
            });

            #endregion Filters
        }

        /// <summary>
        /// Converte DATABASE_URL do formato PostgreSQL (postgresql://user:pass@host:port/db)
        /// para Connection String do Npgsql (Host=host;Database=db;Username=user;Password=pass;SSL Mode=Require)
        /// </summary>
        private static string ConvertPostgresUrlToConnectionString(string databaseUrl)
        {
            try
            {
                var uri = new Uri(databaseUrl);
                var userInfo = uri.UserInfo.Split(':');
                
                var host = uri.Host;
                var port = uri.Port > 0 ? uri.Port : 5432;
                var database = uri.LocalPath.TrimStart('/');
                var username = userInfo[0];
                var password = userInfo.Length > 1 ? userInfo[1] : "";

                return $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";
            }
            catch (Exception ex)
            {
                throw new ArgumentException($"DATABASE_URL inválida: {ex.Message}", ex);
            }
        }
    }
}
