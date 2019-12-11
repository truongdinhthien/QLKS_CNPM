using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface IContractService
    {
         IEnumerable<ContractDTO> GetAll();
         IEnumerable<ContractDTO> GetBy(int id);
         void Add(ContractDTO contractDto);
    }
}