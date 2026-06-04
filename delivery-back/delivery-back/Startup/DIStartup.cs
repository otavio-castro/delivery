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

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

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
    }
}
