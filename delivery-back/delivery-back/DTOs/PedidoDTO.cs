using delivery_back.Models;
using System.Text.Json.Serialization;

namespace delivery_back.DTOs
{
    public class PedidoDTO
    {
        public int PedidoId { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNome { get; set; } = string.Empty;
        public int RestauranteId { get; set; }
        public string RestauranteNome { get; set; } = string.Empty;
        public int EnderecoId { get; set; }
        public string EnderecoCompleto { get; set; } = string.Empty;
        public int? EntregadorId { get; set; }
        public string? EntregadorNome { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public StatusPedido Status { get; set; }
        
        public decimal ValorTotal { get; set; }
        public string? Observacao { get; set; }
        public DateTime DataPedido { get; set; }
        public DateTime CriadoEm { get; set; }
        public DateTime? AtualizadoEm { get; set; }
    }
}
