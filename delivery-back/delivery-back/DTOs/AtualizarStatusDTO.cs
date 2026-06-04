using System.ComponentModel.DataAnnotations;
using delivery_back.Models;

namespace delivery_back.DTOs
{
    public class AtualizarStatusDTO
    {
        [Required(ErrorMessage = "NovoStatus é obrigatório")]
        public StatusPedido NovoStatus { get; set; }
    }
}
