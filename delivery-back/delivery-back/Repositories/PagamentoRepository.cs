using delivery_back.Context;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class PagamentoRepository : IPagamentoRepository
    {
        private readonly AppDbContext _context;

        public PagamentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pagamento>> GetAllAsync(int? pedidoId = null, StatusPagamento? status = null, MetodoPagamento? metodo = null)
        {
            var query = _context.Pagamentos
                .Include(p => p.Pedido)
                    .ThenInclude(p => p != null ? p.Cliente : null)
                .AsQueryable();

            if (pedidoId.HasValue)
                query = query.Where(p => p.PedidoId == pedidoId.Value);

            if (status.HasValue)
                query = query.Where(p => p.Status == status.Value);

            if (metodo.HasValue)
                query = query.Where(p => p.Metodo == metodo.Value);

            return await query.ToListAsync();
        }

        public async Task<Pagamento?> GetByIdAsync(int id)
        {
            return await _context.Pagamentos
                .Include(p => p.Pedido)
                    .ThenInclude(p => p != null ? p.Cliente : null)
                .FirstOrDefaultAsync(p => p.PagamentoId == id);
        }

        public async Task<Pagamento?> GetByPedidoIdAsync(int pedidoId)
        {
            return await _context.Pagamentos
                .FirstOrDefaultAsync(p => p.PedidoId == pedidoId);
        }

        public async Task<Pagamento> CreateAsync(Pagamento pagamento)
        {
            _context.Pagamentos.Add(pagamento);
            await _context.SaveChangesAsync();
            return pagamento;
        }

        public async Task UpdateAsync(Pagamento pagamento)
        {
            _context.Pagamentos.Update(pagamento);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(int id, StatusPagamento novoStatus)
        {
            var pagamento = await GetByIdAsync(id)
                ?? throw new NotFoundException($"Pagamento {id} não encontrado.");

            pagamento.Status = novoStatus;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var pagamento = await GetByIdAsync(id);
            if (pagamento is not null)
            {
                _context.Pagamentos.Remove(pagamento);
                await _context.SaveChangesAsync();
            }
        }
    }
}
