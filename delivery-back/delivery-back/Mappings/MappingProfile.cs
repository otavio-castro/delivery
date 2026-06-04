using AutoMapper;
using delivery_back.DTOs;
using delivery_back.Models;

namespace delivery_back.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Restaurante
            CreateMap<Restaurante, RestauranteDTO>();
            CreateMap<RestauranteCreateDTO, Restaurante>()
                .ForMember(dest => dest.Nota, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.Ativo, opt => opt.MapFrom(src => true));
            CreateMap<RestauranteUpdateDTO, Restaurante>();
        }
    }
}
