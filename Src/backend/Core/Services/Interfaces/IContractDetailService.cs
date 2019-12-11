using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface IContractDetailService
    {
        void Add(ContractDetailDTO contractDetailDto);
        IEnumerable<ContractDetailDTO> GetAll();
        IEnumerable<ContractDetailDTO> GetBy(int id);
    }
}