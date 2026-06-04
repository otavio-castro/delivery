using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IItemPedidoService
    {
        Task<IEnumerable<ItemPedido>> GetAllAsync(int? pedidoId = null);
        Task<ItemPedido?> GetByIdAsync(int id);
        Task<ItemPedido> CreateAsync(ItemPedidoCreateDTO dto);
        Task<ItemPedido> UpdateAsync(int id, ItemPedidoUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
