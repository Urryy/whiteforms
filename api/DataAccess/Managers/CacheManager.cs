using Common.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.Caching;

namespace DataAccess.Managers;

public static class CacheManager
{
    private static MemoryCache _cache = MemoryCache.Default;
    private static readonly object _lockObject = new object();

    public static string KEY_ALL_ENTITIES = "ALLENTITY";
    public static string KEY_ENTITY = "ENTITY{0}";

    public const int EXPIRES_CACHE = 10;

    private static async Task UpdateAllEntities<T>(T? previousEntity, T? currentEntity)
    {
        if (_cache.Contains(KEY_ALL_ENTITIES))
        {
            lock (_lockObject)
            {
                if (_cache.Contains(KEY_ALL_ENTITIES))
                {
                    List<T> items = (List<T>)_cache.Get(KEY_ALL_ENTITIES);
                    
                    if(previousEntity != null)
                    {
                        items.Remove(previousEntity);
                    }
                    
                    if(currentEntity != null)
                    {
                        items.Add(currentEntity);
                    }

                    _cache.Set(KEY_ALL_ENTITIES, items, DateTimeOffset.UtcNow.AddMinutes(EXPIRES_CACHE));
                }
            }
        }
    }

    public static async Task<T> GetOrSet<T>(string key, Func<Task<T>> getItemCallback, DateTimeOffset absoluteExpiration)
    {
        if (!_cache.Contains(key))
        {
            lock (_lockObject)
            {
                if (!_cache.Contains(key))
                {
                    T item = getItemCallback().Result;
                    _cache.Set(key, item, absoluteExpiration);
                }
            }
        }
        return (T)_cache.Get(key);
    }

    public static async Task Remove<T>(string key, Func<Task> removeItemCallback)
    {
        await removeItemCallback();
        if (_cache.Contains(key))
        {
            await UpdateAllEntities(_cache.Get(key), default(T));
            _cache.Remove(key);
        }  
    }

    public static async Task Update<T>(string key, Func<Task> updateItemCallback, T entity, DateTimeOffset absoluteExpiration)
    {
        T previousEntity = default;

        await updateItemCallback();

        if (_cache.Contains(key))
        {
            previousEntity = (T?)_cache.Get(key);
            _cache.Remove(key);
        }

        _cache.Set(key, entity, absoluteExpiration);

        await UpdateAllEntities<T>(previousEntity, entity);
    }

    public static async Task Create<T>(string key, Func<Task> updateItemCallback, T entity, DateTimeOffset absoluteExpiration)
    {
        await updateItemCallback();
        _cache.Set(key, entity, absoluteExpiration);
        await UpdateAllEntities<T>(default(T), entity);
    }
}
