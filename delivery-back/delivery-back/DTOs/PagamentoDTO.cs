using delivery_back.Models;

namespace delivery_back.DTOs
{
    public class PagamentoDTO
    {
        public int PagamentoId { get; set; }
        public int PedidoId { get; set; }
        public string? PedidoNumero { get; set; }
        public string? ClienteNome { get; set; }
        public MetodoPagamento Metodo { get; set; }
        public StatusPagamento Status { get; set; }
        public decimal Valor { get; set; }
        public DateTime CriadoEm { get; set; }
    }
}
