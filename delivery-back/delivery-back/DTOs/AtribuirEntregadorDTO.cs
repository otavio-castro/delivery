using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class AtribuirEntregadorDTO
    {
        [Required(ErrorMessage = "EntregadorId é obrigatório")]
        public int EntregadorId { get; set; }
    }
}
