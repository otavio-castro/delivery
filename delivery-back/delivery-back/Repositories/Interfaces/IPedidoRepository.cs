using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IPedidoRepository
    {
        Task<IEnumerable<Pedido>> GetAllAsync(int? clienteId = null, int? restauranteId = null, StatusPedido? status = null);
        Task<Pedido?> GetByIdAsync(int id);
        Task<Pedido> CreateAsync(Pedido pedido);
        Task UpdateAsync(Pedido pedido);
        Task UpdateStatusAsync(int id, StatusPedido novoStatus);
        Task AtribuirEntregadorAsync(int id, int entregadorId);
        Task DeleteAsync(int id);
    }
}
