using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/enderecos")]
    [ApiController]
    public class EnderecosController : ControllerBase
    {
        private readonly IEnderecoService _service;
        private readonly IMapper _mapper;

        public EnderecosController(IEnderecoService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int clienteId)
        {
            var enderecos = await _service.GetAllByClienteAsync(clienteId);
            return Ok(_mapper.Map<IEnumerable<EnderecoDTO>>(enderecos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var endereco = await _service.GetByIdAsync(id);
            if (endereco is null)
                return NotFound();
            return Ok(_mapper.Map<EnderecoDTO>(endereco));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EnderecoCreateDTO dto)
        {
            var endereco = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = endereco.EnderecoId },
                _mapper.Map<EnderecoDTO>(endereco)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EnderecoUpdateDTO dto)
        {
            var endereco = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<EnderecoDTO>(endereco));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
