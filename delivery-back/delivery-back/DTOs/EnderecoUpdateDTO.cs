using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class EnderecoUpdateDTO
    {
        [Required, StringLength(255)]
        public string Logradouro { get; set; } = string.Empty;

        [Required, StringLength(20)]
        public string Numero { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Complemento { get; set; }

        [Required, StringLength(100)]
        public string Bairro { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [Required, StringLength(10)]
        [RegularExpression(@"^\d{5}-?\d{3}$", ErrorMessage = "CEP deve estar no formato 00000-000 ou 00000000")]
        public string CEP { get; set; } = string.Empty;
    }
}
