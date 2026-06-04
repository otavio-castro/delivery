using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class PedidoCreateDTO
    {
        [Required(ErrorMessage = "ClienteId é obrigatório")]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "RestauranteId é obrigatório")]
        public int RestauranteId { get; set; }

        [Required(ErrorMessage = "EnderecoId é obrigatório")]
        public int EnderecoId { get; set; }

        [Required(ErrorMessage = "ValorTotal é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor total deve ser maior que zero")]
        public decimal ValorTotal { get; set; }

        [StringLength(500, ErrorMessage = "A observação não pode exceder 500 caracteres")]
        public string? Observacao { get; set; }
    }
}
