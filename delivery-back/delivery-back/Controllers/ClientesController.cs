using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _service;
        private readonly IMapper _mapper;

        public ClientesController(IClienteService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clientes = await _service.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<ClienteDTO>>(clientes));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cliente = await _service.GetByIdAsync(id);
            if (cliente is null)
                return NotFound();
            return Ok(_mapper.Map<ClienteDTO>(cliente));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClienteCreateDTO dto)
        {
            var cliente = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = cliente.ClienteId },
                _mapper.Map<ClienteDTO>(cliente)
            );
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ClienteLoginDTO dto)
        {
            var cliente = await _service.LoginAsync(dto);
            return Ok(_mapper.Map<ClienteDTO>(cliente));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ClienteUpdateDTO dto)
        {
            var cliente = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<ClienteDTO>(cliente));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
