using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IPedidoService
    {
        Task<IEnumerable<Pedido>> GetAllAsync(int? clienteId = null, int? restauranteId = null, StatusPedido? status = null);
        Task<Pedido?> GetByIdAsync(int id);
        Task<Pedido> CreateAsync(PedidoCreateDTO dto);
        Task<Pedido> UpdateAsync(int id, PedidoUpdateDTO dto);
        Task<Pedido> UpdateStatusAsync(int id, AtualizarStatusDTO dto);
        Task<Pedido> AtribuirEntregadorAsync(int id, AtribuirEntregadorDTO dto);
        Task DeleteAsync(int id);
    }
}
