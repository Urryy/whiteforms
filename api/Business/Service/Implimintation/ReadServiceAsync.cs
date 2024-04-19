using Business.Service.Interfaces;
using Common.Entities;
using DataAccess.Fetch;
using DataAccess.Repository.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System.Linq.Expressions;

namespace Business.Service.Implimintation;

public class ReadServiceAsync<TEntity> : IReadServiceAsync<TEntity>
    where TEntity : Entity<TEntity>
{
    protected readonly IUnitOfWork _uoW;
    protected IServiceProvider _srvcProvider;
    public ReadServiceAsync(IUnitOfWork uoW, IServiceProvider srvcProvider)
    {
        _uoW = uoW;
        _srvcProvider = srvcProvider;
    }

    public async Task<int> CountAsync()
    {
        var entities = await _uoW.Repository<TEntity>().GetAllFromCacheAsync();
        return entities.Count;
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync(IFetch<TEntity> fetch = null, bool isTracked = false)
    {
        return await _uoW.Repository<TEntity>().GetAllFromCacheAsync(fetch, isTracked);
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
        return await _uoW.Repository<TEntity>().GetByIdFromCacheAsync(id);
    }

    public TFetch GetFetch<TFetch>() where TFetch : IFetch<TEntity>
    {
        var fetch = _srvcProvider.GetRequiredService<TFetch>();
        return fetch;
    }
}
