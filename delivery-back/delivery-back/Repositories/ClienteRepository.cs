using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _context;

        public ClienteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cliente>> GetAllAsync()
            => await _context.Clientes.ToListAsync();

        public async Task<Cliente?> GetByIdAsync(int id)
            => await _context.Clientes
                .Include(c => c.Enderecos)
                .FirstOrDefaultAsync(c => c.ClienteId == id);

        public async Task<Cliente?> GetByEmailAsync(string email)
            => await _context.Clientes
                .FirstOrDefaultAsync(c => c.Email == email);

        public async Task<Cliente> CreateAsync(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task UpdateAsync(Cliente cliente)
        {
            _context.Clientes.Update(cliente);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var cliente = await GetByIdAsync(id);
            if (cliente is not null)
            {
                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> EmailExistsAsync(string email)
            => await _context.Clientes.AnyAsync(c => c.Email == email);
    }
}
