using BCrypt.Net;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _repository;

        public ClienteService(IClienteRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Cliente>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Cliente?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Cliente> CreateAsync(ClienteCreateDTO dto)
        {
            // Validar email único
            if (await _repository.EmailExistsAsync(dto.Email))
                throw new ConflictException($"Email '{dto.Email}' já está em uso.");

            // Criar cliente com senha hasheada
            var cliente = new Cliente
            {
                Nome = dto.Nome,
                Email = dto.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Telefone = dto.Telefone,
                IsAdmin = false
            };

            return await _repository.CreateAsync(cliente);
        }

        public async Task<Cliente> UpdateAsync(int id, ClienteUpdateDTO dto)
        {
            var cliente = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Cliente {id} não encontrado.");

            // Validar email único se alterado
            if (cliente.Email != dto.Email && await _repository.EmailExistsAsync(dto.Email))
                throw new ConflictException($"Email '{dto.Email}' já está em uso.");

            // Atualizar campos
            cliente.Nome = dto.Nome;
            cliente.Email = dto.Email;
            cliente.Telefone = dto.Telefone;

            // Re-hashear senha se fornecida
            if (!string.IsNullOrEmpty(dto.Senha))
                cliente.SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

            await _repository.UpdateAsync(cliente);
            return cliente;
        }

        public async Task DeleteAsync(int id)
            => await _repository.DeleteAsync(id);

        public async Task<Cliente> LoginAsync(ClienteLoginDTO dto)
        {
            var cliente = await _repository.GetByEmailAsync(dto.Email);

            if (cliente is null || !BCrypt.Net.BCrypt.Verify(dto.Senha, cliente.SenhaHash))
                throw new UnauthorizedException("Email ou senha inválidos.");

            return cliente;
        }
    }
}
