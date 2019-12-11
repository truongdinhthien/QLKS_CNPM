using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class BillRepository : Repository<Bill>, IBillRepository
    {
        public BillRepository(HotelContext context) : base(context)
        {

        }
        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }

        public IEnumerable<Bill> GetAllInclude()
        {
            var temp = HotelContext.Bills.Include(b => b.Contract)
                                             .Include(b => b.Employer)
                                                .ToList();
            return temp;
        }

        public IEnumerable<Bill> GetByInclude(int id)
        {
            var temp = HotelContext.Bills.Where(b => b.BillId == id)
                                             .Include(b => b.Contract)
                                             .Include(b => b.Employer)
                                                .ToList();
            return temp;
        }
    }
}