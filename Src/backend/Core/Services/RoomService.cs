using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
using System;
using Core.Models;
using System.Linq;

namespace Core.Services
{
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public RoomService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public IEnumerable<RoomDTO> GetAllInclude()
        {
            var room = _unitOfWork.Rooms.GetAllInclude();
            return _mapper.Map<IEnumerable<Room> , IEnumerable<RoomDTO> >(room);
        }

        public RoomDTO GetBy(string id)
        {
            var room = _unitOfWork.Rooms.GetBy(id);
            return _mapper.Map<Room ,RoomDTO >(room);
        }
        public void Add(RoomDTO roomDto)
        {
            var room = _mapper.Map<RoomDTO,Room>(roomDto);
            _unitOfWork.Rooms.Add(room);

            _unitOfWork.Complete();
        }
        public void Update(string id,RoomDTO roomDto)
        {
            var room = _unitOfWork.Rooms.GetBy(id);
            if (room == null) return;
            room.RoomTypeId = roomDto.RoomTypeId;
            // _mapper.Map<RoomDTO, Room>(roomDto, room);
            _unitOfWork.Complete();
        }

        public List<RentRoom> PostNew()
        {
            int contractId = 0;
            var rooms = this.GetAllInclude();
            List<RentRoom> checkStatuses = new List<RentRoom>();
            foreach (var r in rooms)
            {
                if (r.Status == "Có người")
                {
                    contractId = _unitOfWork.Contracts.Find(c => c.RoomId.Equals(r.RoomId)).LastOrDefault().ContractId;
                    RentRoom checkStatus = new RentRoom();
                    checkStatus.room = r;
                    checkStatus.contractId = contractId;
                    checkStatuses.Add(checkStatus);
                    contractId = 0;
                }
                else
                {
                    RentRoom checkStatus = new RentRoom();
                    checkStatus.room = r;
                    checkStatus.contractId = contractId;
                    checkStatuses.Add(checkStatus);
                }
            }

            return checkStatuses;
        } 
    }
}