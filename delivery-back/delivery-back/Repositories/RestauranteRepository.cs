using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class RestauranteRepository : IRestauranteRepository
    {
        private readonly AppDbContext _context;

        public RestauranteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Restaurante>> GetAllAtivoAsync(string? categoria = null)
        {
            var query = _context.Restaurantes.Where(r => r.Ativo);

            if (!string.IsNullOrWhiteSpace(categoria))
            {
                var categoriaLower = categoria.ToLower();
                query = query.Where(r => r.Categoria != null && r.Categoria.ToLower() == categoriaLower);
            }

            return await query.ToListAsync();
        }

        public async Task<Restaurante?> GetByIdAsync(int id)
            => await _context.Restaurantes.FindAsync(id);

        public async Task<Restaurante> CreateAsync(Restaurante restaurante)
        {
            _context.Restaurantes.Add(restaurante);
            await _context.SaveChangesAsync();
            return restaurante;
        }

        public async Task UpdateAsync(Restaurante restaurante)
        {
            _context.Restaurantes.Update(restaurante);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DesativarAsync(int id)
        {
            var restaurante = await GetByIdAsync(id);
            if (restaurante is null)
                return false;

            restaurante.Ativo = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
