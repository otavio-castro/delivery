using delivery_back.Context;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace delivery_back.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Produto>> GetAllByRestauranteAsync(int? restauranteId = null, string? categoria = null, bool? disponivel = null)
        {
            var query = _context.Produtos
                .Include(p => p.Restaurante)
                .AsQueryable();

            if (restauranteId.HasValue)
            {
                query = query.Where(p => p.RestauranteId == restauranteId.Value);
            }

            if (!string.IsNullOrWhiteSpace(categoria))
            {
                var categoriaLower = categoria.ToLower();
                query = query.Where(p => p.Categoria != null && p.Categoria.ToLower() == categoriaLower);
            }

            if (disponivel.HasValue)
            {
                query = query.Where(p => p.Disponivel == disponivel.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<Produto?> GetByIdAsync(int id)
            => await _context.Produtos
                .Include(p => p.Restaurante)
                .FirstOrDefaultAsync(p => p.ProdutoId == id);

        public async Task<Produto> CreateAsync(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            
            // Recarregar com o Restaurante incluído
            await _context.Entry(produto)
                .Reference(p => p.Restaurante)
                .LoadAsync();
            
            return produto;
        }

        public async Task UpdateAsync(Produto produto)
        {
            _context.Produtos.Update(produto);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto is not null)
            {
                _context.Produtos.Remove(produto);
                await _context.SaveChangesAsync();
            }
        }
    }
}
