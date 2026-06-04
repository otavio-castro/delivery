using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    [Table("Clientes")]
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClienteId { get; set; }

        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(200), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string SenhaHash { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Telefone { get; set; }

        public ICollection<Endereco> Enderecos { get; set; } = [];
        public ICollection<Pedido> Pedidos { get; set; } = [];
    }
}
