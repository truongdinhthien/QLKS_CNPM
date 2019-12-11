using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface IRoomTypeService
    {
        IEnumerable<RoomTypeDTO> GetAll();
        RoomTypeDTO GetBy(int id);
        void Add(RoomTypeDTO roomtypeDto);
        void Update(int id, RoomTypeDTO roomtypeDto);
    }
}