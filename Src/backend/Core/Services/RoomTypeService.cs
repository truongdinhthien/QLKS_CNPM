using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
namespace Core.Services
{
    public class RoomTypeService : IRoomTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public RoomTypeService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<RoomTypeDTO> GetAll()
        {
            var roomtypes = _unitOfWork.RoomTypes.GetAll();
            return _mapper.Map<IEnumerable<RoomType>,IEnumerable<RoomTypeDTO>>(roomtypes);
        }

        public RoomTypeDTO GetBy(int id)
        {
            var roomtype = _unitOfWork.RoomTypes.GetBy(id);
            return _mapper.Map<RoomType,RoomTypeDTO>(roomtype);
        }

        public void Add(RoomTypeDTO roomtypeDto)
        {
            var roomtype = _mapper.Map<RoomTypeDTO,RoomType>(roomtypeDto);
            _unitOfWork.RoomTypes.Add(roomtype);

            _unitOfWork.Complete();
        }
        public void Update(int id,RoomTypeDTO roomtypeDto)
        {
            var roomtype = _unitOfWork.RoomTypes.GetBy(id);
            if (roomtype == null) return;
            roomtype.NameRoomType = roomtypeDto.NameRoomType;
            roomtype.PriceRoom = roomtypeDto.PriceRoom;

            // _mapper.Map<RoomTypeDTO, RoomType>(roomtypeDto, roomtype);
            _unitOfWork.Complete();
        }
    }
}