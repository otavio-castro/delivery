using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace delivery_back.Models
{
    [Table("Enderecos")]
    public class Endereco
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnderecoId { get; set; }

        [Required, StringLength(200)]
        public string Logradouro { get; set; } = string.Empty;

        [Required, StringLength(20)]
        public string Numero { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Complemento { get; set; }

        [Required, StringLength(100)]
        public string Bairro { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string Cidade { get; set; } = string.Empty;

        [Required, StringLength(10)]
        public string CEP { get; set; } = string.Empty;

        [ForeignKey("Cliente")]
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }
    }
}
