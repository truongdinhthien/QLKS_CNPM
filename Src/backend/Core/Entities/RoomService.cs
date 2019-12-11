using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Interfaces;
namespace Core.Entities
{
    public class RoomService : IAggregateRoot
    {
        public int RoomServiceId {get;set;}
        public string NameService {get;set;}
        public int PriceService {get;set;}

        // public ICollection<ContractDetail> ContractDetails{get;set;}
    }
}