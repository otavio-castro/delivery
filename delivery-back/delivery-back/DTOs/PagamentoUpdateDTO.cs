using System.ComponentModel.DataAnnotations;
using delivery_back.Models;

namespace delivery_back.DTOs
{
    public class PagamentoUpdateDTO
    {
        [Required(ErrorMessage = "O método de pagamento é obrigatório")]
        public MetodoPagamento Metodo { get; set; }
    }
}
