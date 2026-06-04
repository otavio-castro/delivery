using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _repository;
        private readonly IRestauranteRepository _restauranteRepository;
        private readonly IMapper _mapper;

        public ProdutoService(
            IProdutoRepository repository,
            IRestauranteRepository restauranteRepository,
            IMapper mapper)
        {
            _repository = repository;
            _restauranteRepository = restauranteRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Produto>> GetAllByRestauranteAsync(int restauranteId, string? categoria = null, bool? disponivel = null)
            => await _repository.GetAllByRestauranteAsync(restauranteId, categoria, disponivel);

        public async Task<Produto?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Produto> CreateAsync(ProdutoCreateDTO dto)
        {
            // Validar se o restaurante existe
            var restaurante = await _restauranteRepository.GetByIdAsync(dto.RestauranteId)
                ?? throw new NotFoundException($"Restaurante {dto.RestauranteId} não encontrado.");

            var produto = _mapper.Map<Produto>(dto);
            return await _repository.CreateAsync(produto);
        }

        public async Task<Produto> UpdateAsync(int id, ProdutoUpdateDTO dto)
        {
            var produto = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Produto {id} não encontrado.");

            _mapper.Map(dto, produto);
            await _repository.UpdateAsync(produto);
            
            // Recarregar com Restaurante incluído
            return await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Produto {id} não encontrado.");
        }

        public async Task DeleteAsync(int id)
        {
            var produto = await _repository.GetByIdAsync(id);
            if (produto is null)
                throw new NotFoundException($"Produto {id} não encontrado.");

            await _repository.DeleteAsync(id);
        }
    }
}
