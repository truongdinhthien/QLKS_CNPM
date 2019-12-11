using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
namespace Core.Services
{
    public class ServiceRoomService : IServiceRoomService
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ServiceRoomService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<RoomServiceDTO> GetAll()
        {
            var roomService = _unitOfWork.ServiceRooms.GetAll();
            return _mapper.Map<IEnumerable<Entities.RoomService> , IEnumerable<RoomServiceDTO> >(roomService);
        }

        public RoomServiceDTO GetBy(int id)
        {
            var roomService = _unitOfWork.ServiceRooms.GetBy(id);
            return _mapper.Map<Entities.RoomService ,RoomServiceDTO >(roomService);
        }
        public void Add(RoomServiceDTO roomServiceDto)
        {
            var roomService = _mapper.Map<RoomServiceDTO,Entities.RoomService>(roomServiceDto);
            _unitOfWork.ServiceRooms.Add(roomService);

            _unitOfWork.Complete();
        }
        public void Update(int id,RoomServiceDTO roomServiceDto)
        {
            var roomService = _unitOfWork.ServiceRooms.GetBy(id);
            if (roomService == null) return;
            roomService.NameService = roomServiceDto.NameService;
            roomService.PriceService = roomServiceDto.PriceService;
            //_mapper.Map<RoomServiceDTO, Entities.RoomService>(roomServiceDto, roomService);
            _unitOfWork.Complete();
        }
    }
}