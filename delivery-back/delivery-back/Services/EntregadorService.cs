using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class EntregadorService : IEntregadorService
    {
        private readonly IEntregadorRepository _repository;
        private readonly IMapper _mapper;

        public EntregadorService(IEntregadorRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Entregador>> GetAllAsync(bool? disponivel = null)
            => await _repository.GetAllAsync(disponivel);

        public async Task<Entregador?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Entregador> CreateAsync(EntregadorCreateDTO dto)
        {
            // Remove formatação do CPF para armazenar apenas números
            var cpfNumeros = new string(dto.CPF.Where(char.IsDigit).ToArray());

            // Validar unicidade do CPF
            if (await _repository.CPFExistsAsync(cpfNumeros))
            {
                throw new ConflictException($"CPF {dto.CPF} já está cadastrado.");
            }

            var entregador = _mapper.Map<Entregador>(dto);
            entregador.CPF = cpfNumeros; // Armazena apenas números

            return await _repository.CreateAsync(entregador);
        }

        public async Task<Entregador> UpdateAsync(int id, EntregadorUpdateDTO dto)
        {
            var entregador = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Entregador {id} não encontrado.");

            // Atualiza apenas os campos permitidos (CPF não pode ser alterado)
            entregador.Nome = dto.Nome;
            entregador.Telefone = dto.Telefone;
            entregador.Veiculo = dto.Veiculo;

            await _repository.UpdateAsync(entregador);
            return entregador;
        }

        public async Task UpdateDisponibilidadeAsync(int id, AlterarDisponibilidadeDTO dto)
        {
            var entregador = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Entregador {id} não encontrado.");

            await _repository.UpdateDisponibilidadeAsync(id, dto.Disponivel);
        }

        public async Task DeleteAsync(int id)
        {
            var entregador = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Entregador {id} não encontrado.");

            await _repository.DeleteAsync(id);
        }
    }
}
