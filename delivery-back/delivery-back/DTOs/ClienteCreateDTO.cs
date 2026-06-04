using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class ClienteCreateDTO
    {
        [Required(ErrorMessage = "Nome é obrigatório.")]
        [StringLength(150, ErrorMessage = "Nome não pode exceder 150 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório.")]
        [StringLength(200, ErrorMessage = "Email não pode exceder 200 caracteres.")]
        [EmailAddress(ErrorMessage = "Email inválido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória.")]
        [MinLength(8, ErrorMessage = "Senha deve ter no mínimo 8 caracteres.")]
        [StringLength(255, ErrorMessage = "Senha não pode exceder 255 caracteres.")]
        public string Senha { get; set; } = string.Empty;

        [StringLength(20, ErrorMessage = "Telefone não pode exceder 20 caracteres.")]
        public string? Telefone { get; set; }
    }
}
