using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class PedidoUpdateDTO
    {
        [StringLength(500, ErrorMessage = "A observação não pode exceder 500 caracteres")]
        public string? Observacao { get; set; }
    }
}
