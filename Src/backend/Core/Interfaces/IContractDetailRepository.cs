using System.Collections.Generic;
using Core.Entities;
namespace Core.Interfaces
{
    public interface IContractDetailRepository : IRepository <ContractDetail>
    {
        IEnumerable<ContractDetail> GetAllInclude();
        IEnumerable<ContractDetail> GetByInclude(int id);
    }
}