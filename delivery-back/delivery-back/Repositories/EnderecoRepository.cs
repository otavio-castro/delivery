using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class EnderecoRepository : IEnderecoRepository
    {
        private readonly AppDbContext _context;

        public EnderecoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Endereco>> GetAllByClienteAsync(int clienteId)
        {
            return await _context.Enderecos
                .Include(e => e.Cliente)
                .Where(e => e.ClienteId == clienteId)
                .ToListAsync();
        }

        public async Task<Endereco?> GetByIdAsync(int id)
            => await _context.Enderecos
                .Include(e => e.Cliente)
                .FirstOrDefaultAsync(e => e.EnderecoId == id);

        public async Task<Endereco> CreateAsync(Endereco endereco)
        {
            _context.Enderecos.Add(endereco);
            await _context.SaveChangesAsync();
            
            // Recarregar com o Cliente incluído
            await _context.Entry(endereco)
                .Reference(e => e.Cliente)
                .LoadAsync();
            
            return endereco;
        }

        public async Task UpdateAsync(Endereco endereco)
        {
            _context.Enderecos.Update(endereco);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var endereco = await _context.Enderecos.FindAsync(id);
            if (endereco is not null)
            {
                _context.Enderecos.Remove(endereco);
                await _context.SaveChangesAsync();
            }
        }
    }
}
