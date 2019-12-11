using System.Collections.Generic;
using Core.Entities;
namespace WebAPI.Models
{
    public class PostBill
    {
        public int ContractId {get;set;}
        public int EmployerId {get;set;}
        // public ICollection<ContractDetail> contractDetails {get;set;}
        // public string RoomId {get;set;}
    }
}