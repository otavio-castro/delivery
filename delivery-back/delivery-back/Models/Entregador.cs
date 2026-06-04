using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    [Table("Entregadores")]
    public class Entregador
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EntregadorId { get; set; }

        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(11)]
        public string CPF { get; set; } = string.Empty;

        [Required, StringLength(20)]
        public string Telefone { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Veiculo { get; set; } = string.Empty;

        public bool Disponivel { get; set; } = true;

        public ICollection<Pedido> Pedidos { get; set; } = [];
    }
}
