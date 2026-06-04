using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/restaurantes")]
    [ApiController]
    public class RestaurantesController : ControllerBase
    {
        private readonly IRestauranteService _service;
        private readonly IMapper _mapper;

        public RestaurantesController(IRestauranteService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? categoria)
        {
            var restaurantes = await _service.GetAllAtivoAsync(categoria);
            return Ok(_mapper.Map<IEnumerable<RestauranteDTO>>(restaurantes));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var restaurante = await _service.GetByIdAtivoAsync(id);
            if (restaurante is null)
                return NotFound();
            return Ok(_mapper.Map<RestauranteDTO>(restaurante));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RestauranteCreateDTO dto)
        {
            var restaurante = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = restaurante.RestauranteId },
                _mapper.Map<RestauranteDTO>(restaurante)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RestauranteUpdateDTO dto)
        {
            var restaurante = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<RestauranteDTO>(restaurante));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DesativarAsync(id);
            return NoContent();
        }
    }
}
