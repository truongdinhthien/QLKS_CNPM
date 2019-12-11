using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Core.Interfaces;
namespace Core.Entities
{
    public class Room : IAggregateRoot
    {
        public string RoomId {get;set;}
        public string Status {get;set;}
        //1 phòng có 1 loại phòng
        public int RoomTypeId {get;set;}
        public RoomType RoomType {get;set;}

        //1 phòng có thể có nhiều hợp đồng
        // public ICollection<Contract> Contracts {get;set;}
    }
}