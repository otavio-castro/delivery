using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class EnderecoService : IEnderecoService
    {
        private readonly IEnderecoRepository _repository;
        private readonly IClienteRepository _clienteRepository;
        private readonly IMapper _mapper;

        public EnderecoService(
            IEnderecoRepository repository,
            IClienteRepository clienteRepository,
            IMapper mapper)
        {
            _repository = repository;
            _clienteRepository = clienteRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Endereco>> GetAllByClienteAsync(int clienteId)
            => await _repository.GetAllByClienteAsync(clienteId);

        public async Task<Endereco?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Endereco> CreateAsync(EnderecoCreateDTO dto)
        {
            // Validar se o cliente existe
            var cliente = await _clienteRepository.GetByIdAsync(dto.ClienteId)
                ?? throw new NotFoundException($"Cliente {dto.ClienteId} não encontrado.");

            var endereco = _mapper.Map<Endereco>(dto);
            return await _repository.CreateAsync(endereco);
        }

        public async Task<Endereco> UpdateAsync(int id, EnderecoUpdateDTO dto)
        {
            var endereco = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Endereço {id} não encontrado.");

            _mapper.Map(dto, endereco);
            await _repository.UpdateAsync(endereco);
            
            // Recarregar com Cliente incluído
            return await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Endereço {id} não encontrado.");
        }

        public async Task DeleteAsync(int id)
        {
            var endereco = await _repository.GetByIdAsync(id);
            if (endereco is null)
                throw new NotFoundException($"Endereço {id} não encontrado.");

            await _repository.DeleteAsync(id);
        }
    }
}
