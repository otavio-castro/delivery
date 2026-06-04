using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Models;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/pagamentos")]
    [ApiController]
    public class PagamentosController : ControllerBase
    {
        private readonly IPagamentoService _service;
        private readonly IMapper _mapper;

        public PagamentosController(IPagamentoService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        /// <summary>
        /// Lista todos os pagamentos com filtros opcionais
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int? pedidoId,
            [FromQuery] StatusPagamento? status,
            [FromQuery] MetodoPagamento? metodo)
        {
            var pagamentos = await _service.GetAllAsync(pedidoId, status, metodo);
            return Ok(_mapper.Map<IEnumerable<PagamentoDTO>>(pagamentos));
        }

        /// <summary>
        /// Busca um pagamento por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pagamento = await _service.GetByIdAsync(id);
            if (pagamento is null)
                return NotFound();
            return Ok(_mapper.Map<PagamentoDTO>(pagamento));
        }

        /// <summary>
        /// Cria um novo pagamento
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PagamentoCreateDTO dto)
        {
            var pagamento = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = pagamento.PagamentoId },
                _mapper.Map<PagamentoDTO>(pagamento)
            );
        }

        /// <summary>
        /// Atualiza o método de pagamento (apenas Metodo pode ser alterado)
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PagamentoUpdateDTO dto)
        {
            var pagamento = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<PagamentoDTO>(pagamento));
        }

        /// <summary>
        /// Atualiza apenas o status do pagamento (com validação de transição)
        /// </summary>
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] AtualizarStatusPagamentoDTO dto)
        {
            await _service.UpdateStatusAsync(id, dto);
            return NoContent();
        }

        /// <summary>
        /// Remove um pagamento
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
