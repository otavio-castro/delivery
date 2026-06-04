using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IRestauranteRepository
    {
        Task<IEnumerable<Restaurante>> GetAllAtivoAsync(string? categoria = null);
        Task<Restaurante?> GetByIdAsync(int id);
        Task<Restaurante> CreateAsync(Restaurante restaurante);
        Task UpdateAsync(Restaurante restaurante);
        Task<bool> DesativarAsync(int id);
    }
}
