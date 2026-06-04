using System.ComponentModel.DataAnnotations;
using delivery_back.Models;

namespace delivery_back.DTOs
{
    public class PagamentoCreateDTO
    {
        [Required(ErrorMessage = "O PedidoId é obrigatório")]
        public int PedidoId { get; set; }

        [Required(ErrorMessage = "O método de pagamento é obrigatório")]
        public MetodoPagamento Metodo { get; set; }

        [Required(ErrorMessage = "O valor é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero")]
        public decimal Valor { get; set; }
    }
}
