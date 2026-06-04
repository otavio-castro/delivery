using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IEnderecoService
    {
        Task<IEnumerable<Endereco>> GetAllByClienteAsync(int clienteId);
        Task<Endereco?> GetByIdAsync(int id);
        Task<Endereco> CreateAsync(EnderecoCreateDTO dto);
        Task<Endereco> UpdateAsync(int id, EnderecoUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
