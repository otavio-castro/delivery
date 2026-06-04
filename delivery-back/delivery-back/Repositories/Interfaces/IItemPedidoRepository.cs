using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IItemPedidoRepository
    {
        Task<IEnumerable<ItemPedido>> GetAllAsync(int? pedidoId = null);
        Task<ItemPedido?> GetByIdAsync(int id);
        Task<ItemPedido> CreateAsync(ItemPedido itemPedido);
        Task UpdateAsync(ItemPedido itemPedido);
        Task DeleteAsync(int id);
    }
}
