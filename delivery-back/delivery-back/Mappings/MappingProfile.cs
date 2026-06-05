using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Restaurante
            CreateMap<Restaurante, RestauranteDTO>();
            CreateMap<RestauranteCreateDTO, Restaurante>()
                .ForMember(dest => dest.Nota, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.Ativo, opt => opt.MapFrom(src => true));
            CreateMap<RestauranteUpdateDTO, Restaurante>();

            // Produto
            CreateMap<Produto, ProdutoDTO>()
                .ForMember(dest => dest.RestauranteNome, opt => opt.MapFrom(src => src.Restaurante != null ? src.Restaurante.Nome : string.Empty));
            CreateMap<ProdutoCreateDTO, Produto>();
            CreateMap<ProdutoUpdateDTO, Produto>();

            // Cliente
            CreateMap<Cliente, ClienteDTO>();
            CreateMap<ClienteCreateDTO, Cliente>()
                .ForMember(dest => dest.SenhaHash, opt => opt.Ignore()); // Hash tratado no Service
            CreateMap<ClienteUpdateDTO, Cliente>()
                .ForMember(dest => dest.SenhaHash, opt => opt.Ignore()); // Hash tratado no Service

            // Endereco
            CreateMap<Endereco, EnderecoDTO>()
                .ForMember(dest => dest.ClienteNome, opt => opt.MapFrom(src => src.Cliente != null ? src.Cliente.Nome : string.Empty));
            CreateMap<EnderecoCreateDTO, Endereco>();
            CreateMap<EnderecoUpdateDTO, Endereco>();

            // Entregador
            CreateMap<Entregador, EntregadorDTO>();
            CreateMap<EntregadorCreateDTO, Entregador>();
            CreateMap<EntregadorUpdateDTO, Entregador>()
                .ForMember(dest => dest.CPF, opt => opt.Ignore()); // CPF não pode ser alterado

            // Pedido
            CreateMap<Pedido, PedidoDTO>()
                .ForMember(dest => dest.ClienteNome, opt => opt.MapFrom(src => src.Cliente != null ? src.Cliente.Nome : string.Empty))
                .ForMember(dest => dest.RestauranteNome, opt => opt.MapFrom(src => src.Restaurante != null ? src.Restaurante.Nome : string.Empty))
                .ForMember(dest => dest.EnderecoCompleto, opt => opt.MapFrom(src => 
                    src.Endereco != null 
                        ? $"{src.Endereco.Logradouro}, {src.Endereco.Numero} - {src.Endereco.Bairro}, {src.Endereco.Cidade} - {src.Endereco.CEP}"
                        : string.Empty))
                .ForMember(dest => dest.EntregadorNome, opt => opt.MapFrom(src => src.Entregador != null ? src.Entregador.Nome : null))
                .ForMember(dest => dest.DataPedido, opt => opt.MapFrom(src => src.CriadoEm));
            CreateMap<PedidoCreateDTO, Pedido>();
            CreateMap<PedidoUpdateDTO, Pedido>();

            // ItemPedido
            CreateMap<ItemPedido, ItemPedidoDTO>()
                .ForMember(dest => dest.ProdutoNome, opt => opt.MapFrom(src => src.Produto != null ? src.Produto.Nome : string.Empty))
                .ForMember(dest => dest.Subtotal, opt => opt.MapFrom(src => src.Quantidade * src.PrecoUnitario));
            CreateMap<ItemPedidoCreateDTO, ItemPedido>();
            CreateMap<ItemPedidoUpdateDTO, ItemPedido>()
                .ForMember(dest => dest.ProdutoId, opt => opt.Ignore())
                .ForMember(dest => dest.PrecoUnitario, opt => opt.Ignore());

            // Pagamento
            CreateMap<Pagamento, PagamentoDTO>()
                .ForMember(dest => dest.PedidoNumero, opt => opt.MapFrom(src => src.Pedido != null ? $"#{src.Pedido.PedidoId.ToString().PadLeft(6, '0')}" : string.Empty))
                .ForMember(dest => dest.ClienteNome, opt => opt.MapFrom(src => src.Pedido != null && src.Pedido.Cliente != null ? src.Pedido.Cliente.Nome : string.Empty));
            CreateMap<PagamentoCreateDTO, Pagamento>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => StatusPagamento.Pendente))
                .ForMember(dest => dest.CriadoEm, opt => opt.MapFrom(src => DateTime.UtcNow));
            CreateMap<PagamentoUpdateDTO, Pagamento>()
                .ForMember(dest => dest.PagamentoId, opt => opt.Ignore())
                .ForMember(dest => dest.PedidoId, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.Valor, opt => opt.Ignore())
                .ForMember(dest => dest.CriadoEm, opt => opt.Ignore());
        }
    }
}
