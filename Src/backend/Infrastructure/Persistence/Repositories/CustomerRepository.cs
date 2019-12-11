using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;
namespace Infrastructure.Persistence.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(HotelContext context) : base(context)
        {

        }
        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }
        // public IEnumerable<Customer> Getby (string cmnd)
        // {
        //     var temp = HotelContext.Customers.Where(c => c.CMND.Equals(cmnd)).ToList();
        //     return temp;
        // }
    }
}