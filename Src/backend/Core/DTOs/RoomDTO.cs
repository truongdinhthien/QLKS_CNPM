using Core.Entities;
namespace Core.DTOs
{
    public class RoomDTO
    {
        public string RoomId {get;set;}
        public int RoomTypeId {get;set;}
        public string Status {get;set;}
        public RoomType RoomType {get;set;}
    }
}