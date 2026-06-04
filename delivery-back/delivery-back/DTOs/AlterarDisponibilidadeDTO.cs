using System.ComponentModel.DataAnnotations;

namespace delivery_back.DTOs
{
    public class AlterarDisponibilidadeDTO
    {
        [Required(ErrorMessage = "O campo Disponivel é obrigatório")]
        public bool Disponivel { get; set; }
    }
}
