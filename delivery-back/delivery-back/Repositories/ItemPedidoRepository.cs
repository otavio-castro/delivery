using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class ItemPedidoRepository : IItemPedidoRepository
    {
        private readonly AppDbContext _context;

        public ItemPedidoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ItemPedido>> GetAllAsync(int? pedidoId = null)
        {
            var query = _context.ItensPedido
                .Include(i => i.Produto)
                .Include(i => i.Pedido)
                .AsQueryable();

            if (pedidoId.HasValue)
                query = query.Where(i => i.PedidoId == pedidoId.Value);

            return await query.ToListAsync();
        }

        public async Task<ItemPedido?> GetByIdAsync(int id)
            => await _context.ItensPedido
                .Include(i => i.Produto)
                .Include(i => i.Pedido)
                .FirstOrDefaultAsync(i => i.ItemPedidoId == id);

        public async Task<ItemPedido> CreateAsync(ItemPedido itemPedido)
        {
            _context.ItensPedido.Add(itemPedido);
            await _context.SaveChangesAsync();
            
            // Recarregar com Produto e Pedido incluídos
            await _context.Entry(itemPedido)
                .Reference(i => i.Produto)
                .LoadAsync();
            await _context.Entry(itemPedido)
                .Reference(i => i.Pedido)
                .LoadAsync();
            
            return itemPedido;
        }

        public async Task UpdateAsync(ItemPedido itemPedido)
        {
            _context.ItensPedido.Update(itemPedido);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var itemPedido = await _context.ItensPedido.FindAsync(id);
            if (itemPedido is not null)
            {
                _context.ItensPedido.Remove(itemPedido);
                await _context.SaveChangesAsync();
            }
        }
    }
}
