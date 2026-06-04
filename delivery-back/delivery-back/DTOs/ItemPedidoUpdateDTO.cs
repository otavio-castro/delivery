using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class ItemPedidoUpdateDTO
    {
        [Required(ErrorMessage = "A quantidade é obrigatória")]
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser no mínimo 1")]
        public int Quantidade { get; set; }

        [StringLength(255, ErrorMessage = "A observação não pode exceder 255 caracteres")]
        public string? Observacao { get; set; }
    }
}
