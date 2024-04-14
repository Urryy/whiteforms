using System.Linq.Expressions;

namespace DataAccess.Repository.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task AddAsync(T entity);
    Task<T?> GetByIdAsync(Guid id);
    Task<T?> GetByExpressionAsync(Expression<Func<T, bool>> expression);
    Task<List<T?>> GetAllAsync(bool isTracked);
    Task<List<T?>> GetAllByExpressionAsync(Expression<Func<T, bool>> expression, bool isTracked);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}
