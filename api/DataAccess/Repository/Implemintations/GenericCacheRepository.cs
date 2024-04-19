using Common.Context;
using Common.Entities;
using DataAccess.Fetch;
using DataAccess.Managers;
using DataAccess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.Implemintations;

public class GenericCacheRepository<T> : GenericRepository<T>, ICacheRepository<T> where T : Entity<T>
{
    public const int EXPIRES_CACHE = 10;

    public GenericCacheRepository(DatabaseContext context) : base(context)
    {
    }

    public async Task<List<T>> GetAllFromCacheAsync(IFetch<T> fetch = null, bool isTracked = true)
    {
        return await CacheManager.GetOrSet("AllMyEntities",() => GetAllAsync(fetch, isTracked), DateTimeOffset.UtcNow.AddMinutes(EXPIRES_CACHE));
    }

    public async Task<T?> GetByIdFromCacheAsync(Guid id, IFetch<T> fetch = null)
    {
        return await CacheManager.GetOrSet($"MyEntity_{id}", () => GetByIdAsync(id, fetch), DateTimeOffset.UtcNow.AddMinutes(EXPIRES_CACHE));
    }

    public async Task DeleteEntityAsync(Guid id)
    {
        await CacheManager.Remove($"MyEntity_{id}", () => DeleteAsync(id));
    }

    public async Task UpdateEntityAsync(T entity)
    {
        await CacheManager.Update($"MyEntity_{entity.Id}", () => UpdateAsync(entity), entity, DateTimeOffset.UtcNow.AddMinutes(EXPIRES_CACHE));
    }

    public async Task CreateEntityAsync(T entity)
    {
        await CacheManager.Create($"MyEntity_{entity.Id}", () => AddAsync(entity), entity, DateTimeOffset.UtcNow.AddMinutes(EXPIRES_CACHE));
    }
}
