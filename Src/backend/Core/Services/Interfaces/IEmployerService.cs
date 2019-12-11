using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface IEmployerService
    {
         IEnumerable<EmployerDTO> GetAll();
         EmployerDTO GetBy(int id);
        bool Add(EmployerDTO employerDto);
        EmployerDTO Find(string username);
        void Block(EmployerDTO employerDto);
        void Update(int id, EmployerDTO employerDto);
    }
}