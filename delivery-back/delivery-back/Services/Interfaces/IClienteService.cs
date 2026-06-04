using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Services.Interfaces
{
    public interface IClienteService
    {
        Task<IEnumerable<Cliente>> GetAllAsync();
        Task<Cliente?> GetByIdAsync(int id);
        Task<Cliente> CreateAsync(ClienteCreateDTO dto);
        Task<Cliente> UpdateAsync(int id, ClienteUpdateDTO dto);
        Task DeleteAsync(int id);
        Task<Cliente> LoginAsync(ClienteLoginDTO dto);
    }
}
