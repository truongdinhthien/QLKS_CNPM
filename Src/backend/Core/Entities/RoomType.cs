using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Core.Interfaces;
namespace Core.Entities
{
    public class RoomType : IAggregateRoot
    {
        public int RoomTypeId {get;set;}
        public string NameRoomType {get;set;}
        public int PriceRoom {get;set;}
        //1 loại phòng có thể có nhiều phòng
        // [JsonIgnore]
        // public ICollection<Room> Rooms {get;set;}
    }
}