using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IProdutoService
    {
        Task<IEnumerable<Produto>> GetAllByRestauranteAsync(int restauranteId, string? categoria = null, bool? disponivel = null);
        Task<Produto?> GetByIdAsync(int id);
        Task<Produto> CreateAsync(ProdutoCreateDTO dto);
        Task<Produto> UpdateAsync(int id, ProdutoUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
