namespace delivery_back.DTOs
{
    public class ProdutoDTO
    {
        public int ProdutoId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public decimal Preco { get; set; }
        public string? ImagemUrl { get; set; }
        public string? Categoria { get; set; }
        public bool Disponivel { get; set; }
        public int RestauranteId { get; set; }
        public string RestauranteNome { get; set; } = string.Empty;
    }
}
