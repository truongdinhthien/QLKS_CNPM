using Core.DTOs;
using Core.Entities;

namespace Core.Models
{
    public class RentRoom
    {
        public RoomDTO room {get;set;}
        public int contractId {get;set;}
    }
}