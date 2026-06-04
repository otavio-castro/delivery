using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class ProdutoCreateDTO
    {
        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Descricao { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero")]
        public decimal Preco { get; set; }

        [StringLength(255)]
        public string? ImagemUrl { get; set; }

        [StringLength(100)]
        public string? Categoria { get; set; }

        public bool Disponivel { get; set; } = true;

        [Required]
        public int RestauranteId { get; set; }
    }
}
