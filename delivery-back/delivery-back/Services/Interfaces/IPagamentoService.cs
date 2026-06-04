using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IPagamentoService
    {
        Task<IEnumerable<Pagamento>> GetAllAsync(int? pedidoId = null, StatusPagamento? status = null, MetodoPagamento? metodo = null);
        Task<Pagamento?> GetByIdAsync(int id);
        Task<Pagamento> CreateAsync(PagamentoCreateDTO dto);
        Task<Pagamento> UpdateAsync(int id, PagamentoUpdateDTO dto);
        Task UpdateStatusAsync(int id, AtualizarStatusPagamentoDTO dto);
        Task DeleteAsync(int id);
    }
}
