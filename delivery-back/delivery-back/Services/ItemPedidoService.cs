using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class ItemPedidoService : IItemPedidoService
    {
        private readonly IItemPedidoRepository _repository;
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IProdutoRepository _produtoRepository;
        private readonly IMapper _mapper;

        public ItemPedidoService(
            IItemPedidoRepository repository,
            IPedidoRepository pedidoRepository,
            IProdutoRepository produtoRepository,
            IMapper mapper)
        {
            _repository = repository;
            _pedidoRepository = pedidoRepository;
            _produtoRepository = produtoRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ItemPedido>> GetAllAsync(int? pedidoId = null)
            => await _repository.GetAllAsync(pedidoId);

        public async Task<ItemPedido?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<ItemPedido> CreateAsync(ItemPedidoCreateDTO dto)
        {
            // Validar se o pedido existe
            var pedido = await _pedidoRepository.GetByIdAsync(dto.PedidoId)
                ?? throw new NotFoundException($"Pedido {dto.PedidoId} não encontrado.");

            // Validar se o pedido está em status Pendente
            if (pedido.Status != StatusPedido.Pendente)
                throw new ConflictException($"Não é possível adicionar itens ao pedido {dto.PedidoId}. O pedido deve estar com status Pendente.");

            // Validar se o produto existe
            var produto = await _produtoRepository.GetByIdAsync(dto.ProdutoId)
                ?? throw new NotFoundException($"Produto {dto.ProdutoId} não encontrado.");

            var itemPedido = _mapper.Map<ItemPedido>(dto);

            // Se PrecoUnitario não foi fornecido, usar o preço atual do produto
            if (!dto.PrecoUnitario.HasValue || dto.PrecoUnitario.Value == 0)
            {
                itemPedido.PrecoUnitario = produto.Preco;
            }

            return await _repository.CreateAsync(itemPedido);
        }

        public async Task<ItemPedido> UpdateAsync(int id, ItemPedidoUpdateDTO dto)
        {
            var itemPedido = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"ItemPedido {id} não encontrado.");

            // Validar se o pedido está em status Pendente
            if (itemPedido.Pedido?.Status != StatusPedido.Pendente)
                throw new ConflictException($"Não é possível atualizar o item {id}. O pedido deve estar com status Pendente.");

            // Atualizar apenas Quantidade e Observacao
            itemPedido.Quantidade = dto.Quantidade;
            itemPedido.Observacao = dto.Observacao;

            await _repository.UpdateAsync(itemPedido);
            
            // Recarregar com Produto e Pedido incluídos
            return await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"ItemPedido {id} não encontrado.");
        }

        public async Task DeleteAsync(int id)
        {
            var itemPedido = await _repository.GetByIdAsync(id);
            if (itemPedido is null)
                throw new NotFoundException($"ItemPedido {id} não encontrado.");

            // Validar se o pedido está em status Pendente
            if (itemPedido.Pedido?.Status != StatusPedido.Pendente)
                throw new ConflictException($"Não é possível remover o item {id}. O pedido deve estar com status Pendente.");

            await _repository.DeleteAsync(id);
        }
    }
}
