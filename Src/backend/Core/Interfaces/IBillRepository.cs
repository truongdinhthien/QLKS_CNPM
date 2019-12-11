using System.Collections.Generic;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBillRepository : IRepository<Bill>
    {
         IEnumerable<Bill> GetAllInclude();
        IEnumerable<Bill> GetByInclude(int id);
    }
}