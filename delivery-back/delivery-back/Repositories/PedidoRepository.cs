using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly AppDbContext _context;

        public PedidoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pedido>> GetAllAsync(int? clienteId = null, int? restauranteId = null, StatusPedido? status = null)
        {
            var query = _context.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.Restaurante)
                .Include(p => p.Endereco)
                .Include(p => p.Entregador)
                .AsQueryable();

            if (clienteId.HasValue)
                query = query.Where(p => p.ClienteId == clienteId.Value);

            if (restauranteId.HasValue)
                query = query.Where(p => p.RestauranteId == restauranteId.Value);

            if (status.HasValue)
                query = query.Where(p => p.Status == status.Value);

            return await query.OrderByDescending(p => p.CriadoEm).ToListAsync();
        }

        public async Task<Pedido?> GetByIdAsync(int id)
            => await _context.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.Restaurante)
                .Include(p => p.Endereco)
                .Include(p => p.Entregador)
                .FirstOrDefaultAsync(p => p.PedidoId == id);

        public async Task<Pedido> CreateAsync(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            // Recarregar com todos os relacionamentos incluídos
            await _context.Entry(pedido).Reference(p => p.Cliente).LoadAsync();
            await _context.Entry(pedido).Reference(p => p.Restaurante).LoadAsync();
            await _context.Entry(pedido).Reference(p => p.Endereco).LoadAsync();

            return pedido;
        }

        public async Task UpdateAsync(Pedido pedido)
        {
            pedido.AtualizadoEm = DateTime.UtcNow;
            _context.Pedidos.Update(pedido);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(int id, StatusPedido novoStatus)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido is not null)
            {
                pedido.Status = novoStatus;
                pedido.AtualizadoEm = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task AtribuirEntregadorAsync(int id, int entregadorId)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido is not null)
            {
                pedido.EntregadorId = entregadorId;
                pedido.AtualizadoEm = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido is not null)
            {
                _context.Pedidos.Remove(pedido);
                await _context.SaveChangesAsync();
            }
        }
    }
}
