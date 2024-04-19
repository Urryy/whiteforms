using Common.Entities;
using DataAccess.Fetch;
using System.Linq.Expressions;

namespace DataAccess.Repository.Interfaces;

public interface IGenericRepository<T> where T : Entity<T>
{
    Task AddAsync(T entity);
    Task<T?> GetByIdAsync(Guid id, IFetch<T> fetch = null);
    Task<T?> GetByExpressionAsync(Expression<Func<T, bool>> expression, IFetch<T> fetch = null);
    Task<List<T>> GetAllAsync(IFetch<T> fetch = null, bool isTracked = false);
    Task<List<T>> GetAllByExpressionAsync(Expression<Func<T, bool>> expression, IFetch<T> fetch = null, bool isTracked = false);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}
