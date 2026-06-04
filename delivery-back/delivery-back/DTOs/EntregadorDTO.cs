namespace delivery_back.DTOs
{
    public class EntregadorDTO
    {
        public int EntregadorId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string Veiculo { get; set; } = string.Empty;
        public bool Disponivel { get; set; }
    }
}
