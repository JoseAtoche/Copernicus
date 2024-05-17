using AutoMapper;

namespace CustomersService.RequestHelpers;

public class MappingProfiles : Profile
{

    public MappingProfiles()
    {
        // Mapeo para crear un Cliente a partir de un CreateClienteDTO
        CreateMap<CreateClienteDTO, Cliente>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

        // Mapeo para actualizar un Cliente a partir de un UpdateClienteDTO
        CreateMap<UpdateClienteDTO, Cliente>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

        // Mapeo para obtener un ClienteDTO a partir de un Cliente
        CreateMap<Cliente, ClienteDTO>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

        CreateMap<Cliente, ClienteDTO>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt)).ReverseMap();



        // Mapeo para obtener un ClienteDTO a partir de un Cliente
        CreateMap<Cliente, ClienteDTO>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt)).ReverseMap();

        // Configuración de mapeo específica para DateTimeOffset -> DateTime
        CreateMap<DateTimeOffset, DateTime>().ConvertUsing(dt => dt.UtcDateTime);
        CreateMap<System.DateTimeOffset, System.DateTime>().ConvertUsing(dt => dt.UtcDateTime);

    }
}