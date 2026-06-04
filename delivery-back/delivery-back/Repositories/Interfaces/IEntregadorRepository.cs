using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IEntregadorRepository
    {
        Task<IEnumerable<Entregador>> GetAllAsync(bool? disponivel = null);
        Task<Entregador?> GetByIdAsync(int id);
        Task<Entregador?> GetByCPFAsync(string cpf);
        Task<Entregador> CreateAsync(Entregador entregador);
        Task UpdateAsync(Entregador entregador);
        Task UpdateDisponibilidadeAsync(int id, bool disponivel);
        Task DeleteAsync(int id);
        Task<bool> CPFExistsAsync(string cpf);
    }
}
