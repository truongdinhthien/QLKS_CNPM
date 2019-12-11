using System.Collections.Generic;
using Core.Entities;
namespace Core.Interfaces
{
    public interface IContractRepository : IRepository<Contract>
    {
        IEnumerable<Contract> GetAllInclude();
        IEnumerable<Contract> GetByInclude(int id);
    }
}