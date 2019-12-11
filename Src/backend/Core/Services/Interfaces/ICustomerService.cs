using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface ICustomerService
    {
         IEnumerable<CustomerDTO> GetAll();
         CustomerDTO GetBy(string id);
         bool Add(CustomerDTO customerDto);
         void Update(CustomerDTO customerDto);
    }
}