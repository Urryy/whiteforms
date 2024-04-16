using Business.Service.Interfaces;
using DataAccess.Fetch;
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
        var entities = await _uoW.Repository<TEntity>().GetAllAsync();
        return entities.Count;
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync(IFetch<TEntity> fetch = null, bool isTracked = false)
    {
        return await _uoW.Repository<TEntity>().GetAllAsync(fetch, isTracked);
    }

    public async Task<IEnumerable<TEntity>> GetAllByExpressionAsync(Expression<Func<TEntity, bool>> expression, IFetch<TEntity> fetch = null, bool isTracked = false)
    {
        return await _uoW.Repository<TEntity>().GetAllByExpressionAsync(expression, fetch, isTracked);
    }

    public async Task<TEntity?> GetByExpressionAsync(Expression<Func<TEntity, bool>> expression, IFetch<TEntity> fetch = null)
    {
        return await _uoW.Repository<TEntity>().GetByExpressionAsync(expression, fetch);
    }

    public async Task<TEntity?> GetByIdAsync(Guid id)
    {
        return await _uoW.Repository<TEntity>().GetByIdAsync(id);
    }
}
