using System.Linq.Expressions;

namespace Business.Service.Interfaces;

public interface IReadServiceAsync<TEntity>
    where TEntity : class
{
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<IEnumerable<TEntity>> GetAllByExpressionAsync(Expression<Func<TEntity, bool>> expression);
    Task<TEntity?> GetByIdAsync(Guid id);
    Task<TEntity?> GetByExpressionAsync(Expression<Func<TEntity, bool>> expression);
    Task<int> CountAsync();
}
