using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Core.Interfaces;
namespace Core.Entities
{
    public class Employer : IAggregateRoot
    {
        public int EmployerId {get;set;}
        public string FullName {get;set;}
        public string PhoneNumber {get;set;}
        public string Address {get;set;}
        public string Gender {get;set;}
        public string Active {get;set;} // 1 : Mở khóa , 0 : khóa


        //User
        public string Role {get;set;} 
        public string Username{get;set;}
        public string Password {get;set;}

        // public ICollection<Contract> Contracts {get;set;}
        // public ICollection<Bill> Bills {get;set;}
    }
}