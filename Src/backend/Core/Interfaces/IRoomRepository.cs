using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
namespace Core.Interfaces
{
    public interface IRoomRepository : IRepository<Room>
    {
        IEnumerable<Room> GetAllInclude();
        IEnumerable<Room> GetByInclude(string id);
    }
}