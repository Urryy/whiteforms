using Business.Service.Interfaces;
using DataAccess.Repository.Interfaces;
using System.Linq.Expressions;

namespace Business.Service.Implimintation;

public class ReadServiceAsync<TEntity> : IReadServiceAsync<TEntity>
    where TEntity : class
{
    protected readonly IUnitOfWork _uoW;
    public ReadServiceAsync(IUnitOfWork uoW)
    {
        _uoW = uoW;
    }

    public async Task<int> CountAsync()
    {
        var entities = await _uoW.Repository<TEntity>().GetAllAsync(true);
        return entities.Count;
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _uoW.Repository<TEntity>().GetAllAsync(true);
    }

    public async Task<IEnumerable<TEntity>> GetAllByExpressionAsync(Expression<Func<TEntity, bool>> expression)
    {
        return await _uoW.Repository<TEntity>().GetAllByExpressionAsync(expression, true);
    }

    public async Task<TEntity?> GetByExpressionAsync(Expression<Func<TEntity, bool>> expression)
    {
        return await _uoW.Repository<TEntity>().GetByExpressionAsync(expression);
    }

    public async Task<TEntity?> GetByIdAsync(Guid id)
    {
        return await _uoW.Repository<TEntity>().GetByIdAsync(id);
    }
}
