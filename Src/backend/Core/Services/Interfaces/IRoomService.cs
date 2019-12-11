using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
using Core.Models;

namespace Core.Services.Interfaces
{
    public interface IRoomService
    {
        IEnumerable<RoomDTO> GetAllInclude ();
        RoomDTO GetBy (string id);
        void Add (RoomDTO roomDto);
        List<RentRoom> PostNew();
        void Update(string id, RoomDTO roomDto);
    }
}