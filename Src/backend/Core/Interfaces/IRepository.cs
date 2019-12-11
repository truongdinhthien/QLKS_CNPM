using System;
using System.Collections.Generic;
using System.Linq.Expressions;
namespace Core.Interfaces
{
   public interface IRepository<T> where T : IAggregateRoot
    {
        T GetBy(int id);
        T GetBy(string id);
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);

        void Add(T entity);
        void AddRange(IEnumerable<T> entities);

        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);        
    }
}