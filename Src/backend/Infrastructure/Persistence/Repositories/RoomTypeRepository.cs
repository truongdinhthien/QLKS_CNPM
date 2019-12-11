using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Core.Entities;
namespace Infrastructure.Persistence.Repositories
{
    public class RoomTypeRepository : Repository<RoomType>,IRoomTypeRepository
    {
        public RoomTypeRepository (HotelContext context) : base(context)
        {

        }

        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }

    }
}