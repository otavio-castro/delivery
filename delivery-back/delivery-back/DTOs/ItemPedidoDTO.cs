namespace delivery_back.DTOs
{
    public class ItemPedidoDTO
    {
        public int ItemPedidoId { get; set; }
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }
        public string ProdutoNome { get; set; } = string.Empty;
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal Subtotal { get; set; }
        public string? Observacao { get; set; }
    }
}
