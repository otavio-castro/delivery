using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IEntregadorService
    {
        Task<IEnumerable<Entregador>> GetAllAsync(bool? disponivel = null);
        Task<Entregador?> GetByIdAsync(int id);
        Task<Entregador> CreateAsync(EntregadorCreateDTO dto);
        Task<Entregador> UpdateAsync(int id, EntregadorUpdateDTO dto);
        Task UpdateDisponibilidadeAsync(int id, AlterarDisponibilidadeDTO dto);
        Task DeleteAsync(int id);
    }
}
