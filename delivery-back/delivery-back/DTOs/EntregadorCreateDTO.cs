using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class EntregadorCreateDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(150, ErrorMessage = "O nome deve ter no máximo 150 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O CPF é obrigatório")]
        [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$", 
            ErrorMessage = "CPF deve estar no formato 000.000.000-00 ou 00000000000")]
        public string CPF { get; set; } = string.Empty;

        [Required(ErrorMessage = "O telefone é obrigatório")]
        [StringLength(20, ErrorMessage = "O telefone deve ter no máximo 20 caracteres")]
        public string Telefone { get; set; } = string.Empty;

        [Required(ErrorMessage = "O veículo é obrigatório")]
        [StringLength(50, ErrorMessage = "O veículo deve ter no máximo 50 caracteres")]
        public string Veiculo { get; set; } = string.Empty;

        public bool Disponivel { get; set; } = true;
    }
}
