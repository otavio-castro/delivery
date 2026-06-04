using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/itenspedido")]
    [ApiController]
    public class ItensPedidoController : ControllerBase
    {
        private readonly IItemPedidoService _service;
        private readonly IMapper _mapper;

        public ItensPedidoController(IItemPedidoService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        /// <summary>
        /// Lista todos os itens de pedido (opcionalmente filtrado por pedido)
        /// </summary>
        /// <param name="pedidoId">ID do pedido para filtrar (opcional)</param>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? pedidoId = null)
        {
            var itens = await _service.GetAllAsync(pedidoId);
            return Ok(_mapper.Map<IEnumerable<ItemPedidoDTO>>(itens));
        }

        /// <summary>
        /// Obtém um item de pedido específico por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item is null)
                return NotFound();
            return Ok(_mapper.Map<ItemPedidoDTO>(item));
        }

        /// <summary>
        /// Cria um novo item de pedido
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ItemPedidoCreateDTO dto)
        {
            var item = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = item.ItemPedidoId },
                _mapper.Map<ItemPedidoDTO>(item)
            );
        }

        /// <summary>
        /// Atualiza um item de pedido existente (apenas Quantidade e Observacao)
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ItemPedidoUpdateDTO dto)
        {
            var item = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<ItemPedidoDTO>(item));
        }

        /// <summary>
        /// Remove um item de pedido
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
