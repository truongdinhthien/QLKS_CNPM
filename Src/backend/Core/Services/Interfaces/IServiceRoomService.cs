using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface IServiceRoomService
    {
         IEnumerable<RoomServiceDTO> GetAll();
         RoomServiceDTO GetBy(int id);
         void Add(RoomServiceDTO roomServiceDto);
        void Update(int id, RoomServiceDTO roomServiceDto);
    }
}