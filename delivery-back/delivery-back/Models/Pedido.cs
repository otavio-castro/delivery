using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    public enum StatusPedido
    {
        Pendente = 0,
        Confirmado = 1,
        EmPreparo = 2,
        EmEntrega = 3,
        Entregue = 4,
        Cancelado = 5
    }

    [Table("Pedidos")]
    public class Pedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PedidoId { get; set; }

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }

        [ForeignKey("Restaurante")]
        public int RestauranteId { get; set; }
        public Restaurante? Restaurante { get; set; }

        [ForeignKey("Endereco")]
        public int EnderecoId { get; set; }
        public Endereco? Endereco { get; set; }

        [ForeignKey("Entregador")]
        public int? EntregadorId { get; set; }
        public Entregador? Entregador { get; set; }

        [Required]
        public StatusPedido Status { get; set; } = StatusPedido.Pendente;

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "O valor total deve ser maior ou igual a zero")]
        public decimal ValorTotal { get; set; }

        [StringLength(500)]
        public string? Observacao { get; set; }

        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
        public DateTime? AtualizadoEm { get; set; }

        public ICollection<ItemPedido> Itens { get; set; } = [];
        public Pagamento? Pagamento { get; set; }
    }
}
