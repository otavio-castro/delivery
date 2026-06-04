using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    [Table("ItensPedido")]
    public class ItemPedido
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemPedidoId { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }
        public Pedido? Pedido { get; set; }

        [ForeignKey("Produto")]
        public int ProdutoId { get; set; }
        public Produto? Produto { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser no mínimo 1")]
        public int Quantidade { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "O preço unitário deve ser maior ou igual a zero")]
        public decimal PrecoUnitario { get; set; }

        [StringLength(255)]
        public string? Observacao { get; set; }
    }
}
