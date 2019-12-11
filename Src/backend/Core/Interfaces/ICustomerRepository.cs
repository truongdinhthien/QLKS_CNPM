using Core.Entities;
using System.Collections.Generic;
namespace Core.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        //  IEnumerable<Customer> Getby (string cmnd);
    }
}