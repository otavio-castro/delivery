using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IRestauranteService
    {
        Task<IEnumerable<Restaurante>> GetAllAtivoAsync(string? categoria = null);
        Task<Restaurante?> GetByIdAtivoAsync(int id);
        Task<Restaurante> CreateAsync(RestauranteCreateDTO dto);
        Task<Restaurante> UpdateAsync(int id, RestauranteUpdateDTO dto);
        Task<bool> DesativarAsync(int id);
    }
}
