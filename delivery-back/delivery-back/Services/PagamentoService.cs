using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class PagamentoService : IPagamentoService
    {
        private readonly IPagamentoRepository _pagamentoRepository;
        private readonly IPedidoRepository _pedidoRepository;

        public PagamentoService(IPagamentoRepository pagamentoRepository, IPedidoRepository pedidoRepository)
        {
            _pagamentoRepository = pagamentoRepository;
            _pedidoRepository = pedidoRepository;
        }

        public async Task<IEnumerable<Pagamento>> GetAllAsync(int? pedidoId = null, StatusPagamento? status = null, MetodoPagamento? metodo = null)
        {
            return await _pagamentoRepository.GetAllAsync(pedidoId, status, metodo);
        }

        public async Task<Pagamento?> GetByIdAsync(int id)
        {
            return await _pagamentoRepository.GetByIdAsync(id);
        }

        public async Task<Pagamento> CreateAsync(PagamentoCreateDTO dto)
        {
            // Validar se pedido existe
            var pedido = await _pedidoRepository.GetByIdAsync(dto.PedidoId)
                ?? throw new NotFoundException($"Pedido {dto.PedidoId} não encontrado.");

            // Validar se pedido já tem pagamento (relação 1:1)
            var pagamentoExistente = await _pagamentoRepository.GetByPedidoIdAsync(dto.PedidoId);
            if (pagamentoExistente is not null)
                throw new ConflictException($"O pedido {dto.PedidoId} já possui um pagamento registrado.");

            // Validar se valor corresponde ao valor total do pedido
            if (dto.Valor != pedido.ValorTotal)
                throw new ConflictException($"O valor do pagamento (R$ {dto.Valor}) não corresponde ao valor total do pedido (R$ {pedido.ValorTotal}).");

            var pagamento = new Pagamento
            {
                PedidoId = dto.PedidoId,
                Metodo = dto.Metodo,
                Valor = dto.Valor,
                Status = StatusPagamento.Pendente,
                CriadoEm = DateTime.UtcNow
            };

            return await _pagamentoRepository.CreateAsync(pagamento);
        }

        public async Task<Pagamento> UpdateAsync(int id, PagamentoUpdateDTO dto)
        {
            var pagamento = await _pagamentoRepository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pagamento {id} não encontrado.");

            // Apenas permite alterar o método de pagamento
            pagamento.Metodo = dto.Metodo;

            await _pagamentoRepository.UpdateAsync(pagamento);
            return pagamento;
        }

        public async Task UpdateStatusAsync(int id, AtualizarStatusPagamentoDTO dto)
        {
            var pagamento = await _pagamentoRepository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pagamento {id} não encontrado.");

            // Validar transição de status
            ValidarTransicaoStatus(pagamento.Status, dto.NovoStatus);

            await _pagamentoRepository.UpdateStatusAsync(id, dto.NovoStatus);
        }

        public async Task DeleteAsync(int id)
        {
            var pagamento = await _pagamentoRepository.GetByIdAsync(id);
            if (pagamento is null)
                throw new NotFoundException($"Pagamento {id} não encontrado.");

            await _pagamentoRepository.DeleteAsync(id);
        }

        private void ValidarTransicaoStatus(StatusPagamento statusAtual, StatusPagamento novoStatus)
        {
            // Máquina de estados para transições válidas
            var transicoesValidas = new Dictionary<StatusPagamento, List<StatusPagamento>>
            {
                { StatusPagamento.Pendente, new List<StatusPagamento> { StatusPagamento.Aprovado, StatusPagamento.Recusado } },
                { StatusPagamento.Aprovado, new List<StatusPagamento>() }, // Não pode reverter
                { StatusPagamento.Recusado, new List<StatusPagamento>() }  // Não pode reverter
            };

            if (!transicoesValidas.ContainsKey(statusAtual))
                throw new ConflictException($"Status atual '{statusAtual}' é inválido.");

            if (!transicoesValidas[statusAtual].Contains(novoStatus))
                throw new ConflictException($"Não é possível alterar o status de '{statusAtual}' para '{novoStatus}'. Transição bloqueada.");
        }
    }
}
