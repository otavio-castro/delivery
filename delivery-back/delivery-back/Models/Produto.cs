using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    [Table("Produtos")]
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProdutoId { get; set; }

        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Descricao { get; set; }

        [Required]
        public decimal Preco { get; set; }

        [StringLength(255)]
        public string? ImagemUrl { get; set; }

        [StringLength(100)]
        public string? Categoria { get; set; }

        public bool Disponivel { get; set; } = true;

        [ForeignKey("Restaurante")]
        public int RestauranteId { get; set; }
        public Restaurante? Restaurante { get; set; }

        public ICollection<ItemPedido> ItensPedido { get; set; } = [];
    }
}
