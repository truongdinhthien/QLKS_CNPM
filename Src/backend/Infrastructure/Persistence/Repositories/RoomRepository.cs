using Core.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
namespace Infrastructure.Persistence.Repositories
{
    public class RoomRepository : Repository<Room>, IRoomRepository
    {
        public RoomRepository (HotelContext context) : base (context)
        {

        }

        protected HotelContext HotelContext
        {
            get { return Context as HotelContext; }
        }

        public IEnumerable<Room> GetAllInclude()
        {
            var temp = HotelContext.Rooms.Include(r => r.RoomType).ToList();
            return temp;
        }
        public IEnumerable<Room> GetByInclude(string id)
        {
            var temp = HotelContext.Rooms.Where(r => r.RoomId == id).Include(r => r.RoomType).ToList();
            return temp;
        }
    }
}