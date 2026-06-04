using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    public enum MetodoPagamento { Cartao = 0, PIX = 1, Dinheiro = 2 }
    public enum StatusPagamento { Pendente = 0, Aprovado = 1, Recusado = 2 }

    [Table("Pagamentos")]
    public class Pagamento
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PagamentoId { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }
        public Pedido? Pedido { get; set; }

        [Required]
        public MetodoPagamento Metodo { get; set; }

        [Required]
        public StatusPagamento Status { get; set; } = StatusPagamento.Pendente;

        public decimal Valor { get; set; }

        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
    }
}
