using System;
using System.Collections.Generic;

using Core.Interfaces;
namespace Core.Entities
{
    public class Contract : IAggregateRoot
    {
        public int ContractId {get;set;}
        public DateTime DateIn {get;set;}
        public DateTime DateOut {get;set;}

        //1 hợp đồng có 1 khách thuê
        public int CustomerId {get;set;}
        public Customer Customer {get;set;}
        //1 hợp đồng có 1 phòng
        public string RoomId {get;set;}
        public Room Room {get;set;}
        //1 hợp đồng có 1 hóa đơn
        public Bill Bill {get;set;}

        public int EmployerId {get;set;}
        public Employer Employer {get;set;}

        // public ICollection<ContractDetail> ContractDetails {get;set;}
        
    }
}