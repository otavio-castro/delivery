using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class RestauranteUpdateDTO
    {
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
    }
}
