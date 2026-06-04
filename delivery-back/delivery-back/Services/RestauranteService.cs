using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class RestauranteService : IRestauranteService
    {
        private readonly IRestauranteRepository _repository;
        private readonly IMapper _mapper;

        public RestauranteService(IRestauranteRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Restaurante>> GetAllAtivoAsync(string? categoria = null)
            => await _repository.GetAllAtivoAsync(categoria);

        public async Task<Restaurante?> GetByIdAtivoAsync(int id)
        {
            var restaurante = await _repository.GetByIdAsync(id);
            if (restaurante is null || !restaurante.Ativo)
                return null;
            return restaurante;
        }

        public async Task<Restaurante> CreateAsync(RestauranteCreateDTO dto)
        {
            var restaurante = _mapper.Map<Restaurante>(dto);
            return await _repository.CreateAsync(restaurante);
        }

        public async Task<Restaurante> UpdateAsync(int id, RestauranteUpdateDTO dto)
        {
            var restaurante = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Restaurante {id} não encontrado.");

            _mapper.Map(dto, restaurante);
            await _repository.UpdateAsync(restaurante);
            return restaurante;
        }

        public async Task<bool> DesativarAsync(int id)
        {
            var sucesso = await _repository.DesativarAsync(id);
            if (!sucesso)
                throw new NotFoundException($"Restaurante {id} não encontrado.");
            return true;
        }
    }
}
