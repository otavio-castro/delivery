using delivery_back.Models;

namespace delivery_back.Repositories.Interfaces
{
    public interface IEnderecoRepository
    {
        Task<IEnumerable<Endereco>> GetAllByClienteAsync(int clienteId);
        Task<Endereco?> GetByIdAsync(int id);
        Task<Endereco> CreateAsync(Endereco endereco);
        Task UpdateAsync(Endereco endereco);
        Task DeleteAsync(int id);
    }
}
