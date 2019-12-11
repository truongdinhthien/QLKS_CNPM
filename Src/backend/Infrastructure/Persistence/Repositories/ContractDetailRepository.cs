using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Persistence.Repositories
{
    public class ContractDetailRepository : Repository<ContractDetail>, IContractDetailRepository
    {
        public ContractDetailRepository(HotelContext context) : base(context)
        {

        }
        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }

        public IEnumerable<ContractDetail> GetAllInclude()
        {
            var temp = HotelContext.ContractDetails.Include(cd => cd.Contract)
                                                   .Include(cd => cd.RoomService)
                                                   .ToList();
            return temp;
        }

        public IEnumerable<ContractDetail> GetByInclude(int id){
            var temp = HotelContext.ContractDetails.Where(cd => cd.ContractId == id)
                                                    .Include(cd => cd.Contract)
                                                    .Include(cd => cd.RoomService)
                                                    .ToList();
            if (temp.LongCount() > 0)
            return temp;
            else return null;
        }
    }
}