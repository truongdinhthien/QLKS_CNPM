using System.Collections.Generic;
using Core.DTOs;
using Core.Entities;
using AutoMapper;
namespace Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Room, RoomDTO>();
            CreateMap<RoomDTO, Room>();

            CreateMap<RoomType, RoomTypeDTO>();
            CreateMap<RoomTypeDTO, RoomType>();

            CreateMap<RoomService, RoomServiceDTO>();
            CreateMap<RoomServiceDTO, RoomService>();

            CreateMap<Customer, CustomerDTO>();
            CreateMap<CustomerDTO, Customer>();

            CreateMap<Employer, EmployerDTO>();
            CreateMap<EmployerDTO, Employer>();

            CreateMap<Contract, ContractDTO>();
            CreateMap<ContractDTO, Contract>();

            CreateMap<ContractDetail, ContractDetailDTO>();
            CreateMap<ContractDetailDTO, ContractDetail>();

            CreateMap<Bill, BillDTO>();
            CreateMap<BillDTO, Bill>();
        }
    }
}