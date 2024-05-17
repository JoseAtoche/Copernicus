using AutoMapper;
using Core.Models;

namespace Core.Utils;

public class MappingProfile : Profile
{

    public MappingProfile()
    {
        CreateMap<Customer, CustomerDTO>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<CustomerDTO, Customer>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Configuración de mapeo específica para DateTimeOffset -> DateTime
        CreateMap<DateTimeOffset, DateTime>().ConvertUsing(dt => dt.UtcDateTime);

    }
}