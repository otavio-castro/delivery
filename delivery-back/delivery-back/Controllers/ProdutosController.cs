using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace delivery_back.Controllers
{
    [Route("api/produtos")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoService _service;
        private readonly IMapper _mapper;

        public ProdutosController(IProdutoService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int restauranteId,
            [FromQuery] string? categoria,
            [FromQuery] bool? disponivel)
        {
            var produtos = await _service.GetAllByRestauranteAsync(restauranteId, categoria, disponivel);
            return Ok(_mapper.Map<IEnumerable<ProdutoDTO>>(produtos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var produto = await _service.GetByIdAsync(id);
            if (produto is null)
                return NotFound();
            return Ok(_mapper.Map<ProdutoDTO>(produto));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProdutoCreateDTO dto)
        {
            var produto = await _service.CreateAsync(dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = produto.ProdutoId },
                _mapper.Map<ProdutoDTO>(produto)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProdutoUpdateDTO dto)
        {
            var produto = await _service.UpdateAsync(id, dto);
            return Ok(_mapper.Map<ProdutoDTO>(produto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
