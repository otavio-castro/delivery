using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class EntregadorUpdateDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(150, ErrorMessage = "O nome deve ter no máximo 150 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O telefone é obrigatório")]
        [StringLength(20, ErrorMessage = "O telefone deve ter no máximo 20 caracteres")]
        public string Telefone { get; set; } = string.Empty;

        [Required(ErrorMessage = "O veículo é obrigatório")]
        [StringLength(50, ErrorMessage = "O veículo deve ter no máximo 50 caracteres")]
        public string Veiculo { get; set; } = string.Empty;
    }
}
