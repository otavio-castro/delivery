using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IPagamentoRepository
    {
        Task<IEnumerable<Pagamento>> GetAllAsync(int? pedidoId = null, StatusPagamento? status = null, MetodoPagamento? metodo = null);
        Task<Pagamento?> GetByIdAsync(int id);
        Task<Pagamento?> GetByPedidoIdAsync(int pedidoId);
        Task<Pagamento> CreateAsync(Pagamento pagamento);
        Task UpdateAsync(Pagamento pagamento);
        Task UpdateStatusAsync(int id, StatusPagamento novoStatus);
        Task DeleteAsync(int id);
    }
}
