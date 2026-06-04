using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class EntregadorRepository : IEntregadorRepository
    {
        private readonly AppDbContext _context;

        public EntregadorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Entregador>> GetAllAsync(bool? disponivel = null)
        {
            var query = _context.Entregadores.AsQueryable();

            if (disponivel.HasValue)
            {
                query = query.Where(e => e.Disponivel == disponivel.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Entregador?> GetByIdAsync(int id)
            => await _context.Entregadores.FindAsync(id);

        public async Task<Entregador?> GetByCPFAsync(string cpf)
        {
            // Remove formatação do CPF para comparação (apenas números)
            var cpfNumeros = new string(cpf.Where(char.IsDigit).ToArray());
            return await _context.Entregadores
                .FirstOrDefaultAsync(e => e.CPF == cpfNumeros);
        }

        public async Task<Entregador> CreateAsync(Entregador entregador)
        {
            _context.Entregadores.Add(entregador);
            await _context.SaveChangesAsync();
            return entregador;
        }

        public async Task UpdateAsync(Entregador entregador)
        {
            _context.Entregadores.Update(entregador);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDisponibilidadeAsync(int id, bool disponivel)
        {
            var entregador = await GetByIdAsync(id);
            if (entregador is not null)
            {
                entregador.Disponivel = disponivel;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int id)
        {
            var entregador = await GetByIdAsync(id);
            if (entregador is not null)
            {
                _context.Entregadores.Remove(entregador);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> CPFExistsAsync(string cpf)
        {
            // Remove formatação do CPF para comparação (apenas números)
            var cpfNumeros = new string(cpf.Where(char.IsDigit).ToArray());
            return await _context.Entregadores.AnyAsync(e => e.CPF == cpfNumeros);
        }
    }
}
