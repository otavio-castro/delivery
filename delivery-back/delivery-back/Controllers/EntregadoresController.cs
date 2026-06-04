using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/entregadores")]
    [ApiController]
    public class EntregadoresController : ControllerBase
    {
        private readonly IEntregadorService _service;
        private readonly IMapper _mapper;

        public EntregadoresController(IEntregadorService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool? disponivel)
        {
            var entregadores = await _service.GetAllAsync(disponivel);
            return Ok(_mapper.Map<IEnumerable<EntregadorDTO>>(entregadores));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entregador = await _service.GetByIdAsync(id);
            if (entregador is null)
                return NotFound();
            return Ok(_mapper.Map<EntregadorDTO>(entregador));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EntregadorCreateDTO dto)
        {
            var entregador = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = entregador.EntregadorId },
                _mapper.Map<EntregadorDTO>(entregador)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EntregadorUpdateDTO dto)
        {
            var entregador = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<EntregadorDTO>(entregador));
        }

        [HttpPatch("{id}/disponibilidade")]
        public async Task<IActionResult> UpdateDisponibilidade(int id, [FromBody] AlterarDisponibilidadeDTO dto)
        {
            await _service.UpdateDisponibilidadeAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
