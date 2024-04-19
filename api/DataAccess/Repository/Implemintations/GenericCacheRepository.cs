using Common.Context;
using Common.Entities;
using DataAccess.Fetch;
using DataAccess.Managers;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implemintations;

public class GenericCacheRepository<T> : GenericRepository<T>, ICacheRepository<T> where T : Entity<T>
{

    public GenericCacheRepository(DatabaseContext context) : base(context)
    {
    }

    public async Task<List<T>> GetAllFromCacheAsync(IFetch<T> fetch = null, bool isTracked = true)
    {
        return await CacheManager.GetOrSet(CacheManager.KEY_ALL_ENTITIES,
            () => GetAllAsync(fetch, isTracked), DateTimeOffset.UtcNow.AddMinutes(CacheManager.EXPIRES_CACHE));
    }

    public async Task<T?> GetByIdFromCacheAsync(Guid id, IFetch<T> fetch = null)
    {
        return await CacheManager.GetOrSet(string.Format(CacheManager.KEY_ENTITY, id),
            () => GetByIdAsync(id, fetch), DateTimeOffset.UtcNow.AddMinutes(CacheManager.EXPIRES_CACHE));
    }

    public async Task DeleteEntityAsync(Guid id)
    {
        await CacheManager.Remove<T>(string.Format(CacheManager.KEY_ENTITY, id), () => DeleteAsync(id));
    }

    public async Task UpdateEntityAsync(T entity)
    {
        await CacheManager.Update(string.Format(CacheManager.KEY_ENTITY, entity.Id),
            () => UpdateAsync(entity), entity, DateTimeOffset.UtcNow.AddMinutes(CacheManager.EXPIRES_CACHE));
    }

    public async Task CreateEntityAsync(T entity)
    {
        await CacheManager.Create(string.Format(CacheManager.KEY_ENTITY, entity.Id),
            () => AddAsync(entity), entity, DateTimeOffset.UtcNow.AddMinutes(CacheManager.EXPIRES_CACHE));
    }
}
