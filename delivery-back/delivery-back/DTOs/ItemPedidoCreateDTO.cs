using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class ItemPedidoCreateDTO
    {
        [Required(ErrorMessage = "O PedidoId é obrigatório")]
        public int PedidoId { get; set; }

        [Required(ErrorMessage = "O ProdutoId é obrigatório")]
        public int ProdutoId { get; set; }

        [Required(ErrorMessage = "A quantidade é obrigatória")]
        [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser no mínimo 1")]
        public int Quantidade { get; set; }

        /// <summary>
        /// Preço unitário do produto no momento do pedido. 
        /// Se não fornecido, será preenchido automaticamente com o preço atual do produto.
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "O preço unitário deve ser maior ou igual a zero")]
        public decimal? PrecoUnitario { get; set; }

        [StringLength(255, ErrorMessage = "A observação não pode exceder 255 caracteres")]
        public string? Observacao { get; set; }
    }
}
