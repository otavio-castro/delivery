namespace delivery_back.DTOs
{
    public class RestauranteDTO
    {
        public int RestauranteId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string? Categoria { get; set; }
        public string? ImagemUrl { get; set; }
        public string? Endereco { get; set; }
        public decimal Nota { get; set; }
        public bool Ativo { get; set; }
    }
}
