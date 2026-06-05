using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Exceptions;
using delivery_back.Models;
using delivery_back.Repositories.Interfaces;
using delivery_back.Services.Interfaces;

namespace delivery_back.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _repository;
        private readonly IClienteRepository _clienteRepository;
        private readonly IRestauranteRepository _restauranteRepository;
        private readonly IEnderecoRepository _enderecoRepository;
        private readonly IEntregadorRepository _entregadorRepository;
        private readonly IMapper _mapper;

        public PedidoService(
            IPedidoRepository repository,
            IClienteRepository clienteRepository,
            IRestauranteRepository restauranteRepository,
            IEnderecoRepository enderecoRepository,
            IEntregadorRepository entregadorRepository,
            IMapper mapper)
        {
            _repository = repository;
            _clienteRepository = clienteRepository;
            _restauranteRepository = restauranteRepository;
            _enderecoRepository = enderecoRepository;
            _entregadorRepository = entregadorRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Pedido>> GetAllAsync(int? clienteId = null, int? restauranteId = null, StatusPedido? status = null)
            => await _repository.GetAllAsync(clienteId, restauranteId, status);

        public async Task<Pedido?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Pedido> CreateAsync(PedidoCreateDTO dto)
        {
            // Validar se o cliente existe
            var cliente = await _clienteRepository.GetByIdAsync(dto.ClienteId)
                ?? throw new NotFoundException($"Cliente {dto.ClienteId} não encontrado.");

            // Validar se o restaurante existe
            var restaurante = await _restauranteRepository.GetByIdAsync(dto.RestauranteId)
                ?? throw new NotFoundException($"Restaurante {dto.RestauranteId} não encontrado.");

            // Validar se o endereço existe e pertence ao cliente
            var endereco = await _enderecoRepository.GetByIdAsync(dto.EnderecoId)
                ?? throw new NotFoundException($"Endereço {dto.EnderecoId} não encontrado.");

            if (endereco.ClienteId != dto.ClienteId)
                throw new ConflictException($"Endereço {dto.EnderecoId} não pertence ao cliente {dto.ClienteId}.");

            var pedido = _mapper.Map<Pedido>(dto);
            pedido.Status = StatusPedido.Pendente;
            pedido.CriadoEm = DateTime.UtcNow;

            return await _repository.CreateAsync(pedido);
        }

        public async Task<Pedido> UpdateAsync(int id, PedidoUpdateDTO dto)
        {
            var pedido = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pedido {id} não encontrado.");

            // Apenas a observação pode ser atualizada
            pedido.Observacao = dto.Observacao;
            await _repository.UpdateAsync(pedido);

            return await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pedido {id} não encontrado.");
        }

        public async Task<Pedido> UpdateStatusAsync(int id, AtualizarStatusDTO dto)
        {
            var pedido = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pedido {id} não encontrado.");

            var statusAtual = pedido.Status;
            var novoStatus = dto.NovoStatus;

            // Se o status não mudou, retornar sem fazer nada
            if (statusAtual == novoStatus)
            {
                return pedido;
            }

            // Validar transições de status
            if (!IsTransicaoValida(statusAtual, novoStatus))
            {
                throw new ConflictException(
                    $"Transição de status inválida: não é possível mudar de {statusAtual} para {novoStatus}. " +
                    GetMensagemTransicoesPermitidas(statusAtual));
            }

            await _repository.UpdateStatusAsync(id, novoStatus);

            return await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pedido {id} não encontrado.");
        }

        public async Task<Pedido> AtribuirEntregadorAsync(int id, AtribuirEntregadorDTO dto)
        {
            var pedido = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pedido {id} não encontrado.");

            // Validar se o entregador existe
            var entregador = await _entregadorRepository.GetByIdAsync(dto.EntregadorId)
                ?? throw new NotFoundException($"Entregador {dto.EntregadorId} não encontrado.");

            // Validar se o entregador está disponível
            if (!entregador.Disponivel)
                throw new ConflictException($"Entregador {dto.EntregadorId} não está disponível.");

            await _repository.AtribuirEntregadorAsync(id, dto.EntregadorId);

            return await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Pedido {id} não encontrado.");
        }

        public async Task DeleteAsync(int id)
        {
            var pedido = await _repository.GetByIdAsync(id);
            if (pedido is null)
                throw new NotFoundException($"Pedido {id} não encontrado.");

            await _repository.DeleteAsync(id);
        }

        private static bool IsTransicaoValida(StatusPedido statusAtual, StatusPedido novoStatus)
        {
            return statusAtual switch
            {
                StatusPedido.Pendente => novoStatus == StatusPedido.Confirmado || novoStatus == StatusPedido.Cancelado,
                StatusPedido.Confirmado => novoStatus == StatusPedido.EmPreparo || novoStatus == StatusPedido.Cancelado,
                StatusPedido.EmPreparo => novoStatus == StatusPedido.EmEntrega || novoStatus == StatusPedido.Cancelado,
                StatusPedido.EmEntrega => novoStatus == StatusPedido.Entregue || novoStatus == StatusPedido.Cancelado,
                StatusPedido.Entregue => false, // Não pode sair de Entregue
                StatusPedido.Cancelado => false, // Não pode sair de Cancelado
                _ => false
            };
        }

        private static string GetMensagemTransicoesPermitidas(StatusPedido statusAtual)
        {
            return statusAtual switch
            {
                StatusPedido.Pendente => "Transições permitidas: Confirmado ou Cancelado.",
                StatusPedido.Confirmado => "Transições permitidas: EmPreparo ou Cancelado.",
                StatusPedido.EmPreparo => "Transições permitidas: EmEntrega ou Cancelado.",
                StatusPedido.EmEntrega => "Transições permitidas: Entregue ou Cancelado.",
                StatusPedido.Entregue => "Pedido entregue não pode ter o status alterado.",
                StatusPedido.Cancelado => "Pedido cancelado não pode ter o status alterado.",
                _ => "Status desconhecido."
            };
        }
    }
}
