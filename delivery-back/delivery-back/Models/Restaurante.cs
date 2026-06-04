using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    [Table("Restaurantes")]
    public class Restaurante
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RestauranteId { get; set; }

        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Descricao { get; set; }

        [StringLength(100)]
        public string? Categoria { get; set; }

        [StringLength(255)]
        public string? ImagemUrl { get; set; }

        [StringLength(200)]
        public string? Endereco { get; set; }

        public decimal Nota { get; set; }

        public bool Ativo { get; set; } = true;

        public ICollection<Produto> Produtos { get; set; } = [];
        public ICollection<Pedido> Pedidos { get; set; } = [];
    }
}
