using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Caching;

namespace DataAccess.Managers;

public static class CacheManager
{
    private static MemoryCache _cache = MemoryCache.Default;
    private static readonly object _lockObject = new object();

    public static async Task<T> GetOrSet<T>(string key , Func<Task<T>> getItemCallback, DateTimeOffset absoluteExpiration)
    {
        if (!_cache.Contains(key))
        {
            lock (_lockObject)
            {
                if(!_cache.Contains(key)) 
                {
                    T item = getItemCallback().Result;
                    _cache.Set(key, item, absoluteExpiration);
                }
            }
        }
        return (T)_cache.Get(key);
    }

    public static async Task Remove(string key, Func<Task> removeItemCallback)
    {
        await removeItemCallback();
        if (_cache.Contains(key)) 
        {
            _cache.Remove(key);
        }
    }

    public static async Task Update<T>(string key, Func<Task> updateItemCallback, T entity, DateTimeOffset absoluteExpiration)
    {
        await updateItemCallback();
        if (_cache.Contains(key))
        {
            _cache.Remove(key);  
        }

        _cache.Set(key, entity, absoluteExpiration);
    }

    public static async Task Create<T>(string key, Func<Task> updateItemCallback, T entity, DateTimeOffset absoluteExpiration)
    {
        await updateItemCallback();
        _cache.Set(key, entity, absoluteExpiration);
    }
}
