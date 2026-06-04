using System.ComponentModel.DataAnnotations;
using delivery_back.Models;

namespace delivery_back.DTOs
{
    public class AtualizarStatusPagamentoDTO
    {
        [Required(ErrorMessage = "O novo status é obrigatório")]
        public StatusPagamento NovoStatus { get; set; }
    }
}
