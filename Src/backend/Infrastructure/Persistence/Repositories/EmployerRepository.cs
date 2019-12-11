using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;
namespace Infrastructure.Persistence.Repositories
{
    public class EmployerRepository : Repository<Employer>, IEmployerRepository
    {
        public EmployerRepository(HotelContext context) : base(context)
        {
            
        }
        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }
    }
}