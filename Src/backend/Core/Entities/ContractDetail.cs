using System;
using Core.Interfaces;
namespace Core.Entities
{
    public class ContractDetail : IAggregateRoot
    {
        public int ContractDetailId {get;set;}
        public int RoomServiceId {get;set;}
        public RoomService RoomService {get;set;}

        public int ContractId {get;set;}
        public Contract Contract {get;set;}

        public int Amount {get;set;}
        public DateTime TimeAdded {get;set;}
    }
}