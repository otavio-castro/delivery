using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IProdutoRepository
    {
        Task<IEnumerable<Produto>> GetAllByRestauranteAsync(int? restauranteId = null, string? categoria = null, bool? disponivel = null);
        Task<Produto?> GetByIdAsync(int id);
        Task<Produto> CreateAsync(Produto produto);
        Task UpdateAsync(Produto produto);
        Task DeleteAsync(int id);
    }
}
