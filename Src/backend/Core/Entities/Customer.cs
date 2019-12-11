using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Interfaces;
namespace Core.Entities
{
    public class Customer : IAggregateRoot
    {
        public int CustomerId {get;set;}
        public string CMND {get;set;}
        public string FullName {get;set;}
        public string PhoneNumber {get;set;}
        public string Address {get;set;}
        public string Gender {get;set;}

        // public ICollection <Contract> Contracts {get;set;}
        
    }
}