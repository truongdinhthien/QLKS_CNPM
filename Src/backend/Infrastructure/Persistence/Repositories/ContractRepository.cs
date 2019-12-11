using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class ContractRepository : Repository<Contract>, IContractRepository
    {
        public ContractRepository(HotelContext context) : base(context)
        {

        }
        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }
        public IEnumerable<Contract> GetAllInclude()
        {
            var temp = HotelContext.Contracts.Include(c => c.Customer)
                                             .Include(c => c.Room)
                                             .Include(c => c.Employer).ToList();
            return temp;
        }

        public IEnumerable<Contract> GetByInclude(int id){
            var temp = HotelContext.Contracts.Where(c => c.ContractId == id)
                                             .Include(c => c.Customer)
                                             .Include(c => c.Room)
                                             .ThenInclude(r => r.RoomType)
                                             .Include(c => c.Employer).ToList();
            return temp;
        }
    }
}