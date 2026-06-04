using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Models;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/pedidos")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly IPedidoService _service;
        private readonly IMapper _mapper;

        public PedidosController(IPedidoService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int? clienteId,
            [FromQuery] int? restauranteId,
            [FromQuery] StatusPedido? status)
        {
            var pedidos = await _service.GetAllAsync(clienteId, restauranteId, status);
            return Ok(_mapper.Map<IEnumerable<PedidoDTO>>(pedidos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pedido = await _service.GetByIdAsync(id);
            if (pedido is null)
                return NotFound();
            return Ok(_mapper.Map<PedidoDTO>(pedido));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PedidoCreateDTO dto)
        {
            var pedido = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = pedido.PedidoId },
                _mapper.Map<PedidoDTO>(pedido)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PedidoUpdateDTO dto)
        {
            var pedido = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<PedidoDTO>(pedido));
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] AtualizarStatusDTO dto)
        {
            var pedido = await _service.UpdateStatusAsync(id, dto);
            return Ok(_mapper.Map<PedidoDTO>(pedido));
        }

        [HttpPatch("{id}/entregador")]
        public async Task<IActionResult> AtribuirEntregador(int id, [FromBody] AtribuirEntregadorDTO dto)
        {
            var pedido = await _service.AtribuirEntregadorAsync(id, dto);
            return Ok(_mapper.Map<PedidoDTO>(pedido));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
