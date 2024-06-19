using Common.Entities;
using DataAccess.Extension;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Runtime.Caching;

namespace DataAccess.Managers;

public static class CacheManager
{
    private static MemoryCache _cache = MemoryCache.Default;

    private static readonly object _lockObject = new object();

    private static DateTimeOffset EXPIRES_CACHE = DateTimeOffset.UtcNow.AddDays(1);

    private static void UpdateAllEntities<T>(T? previousEntity, T? currentEntity) where T : Entity<T>
    {
        var key = CacheManagerExtension.GetAllEntityKey<T>();

		if (_cache.Contains(key))
        {
            lock (_lockObject)
            {
                if (_cache.Contains(key))
                {
                    List<T> items = (List<T>)_cache.Get(key);
                    
                    if(previousEntity != null && items.Find(i => i.Id == previousEntity.Id) != null)
                    {
                        items.Remove(items.First(i => i.Id == previousEntity.Id));
                    }
                    
                    if(currentEntity != null)
                    {
                        items.Add(currentEntity);
                    }

                    _cache.Set(key, items, EXPIRES_CACHE);
                }
            }
        }
        else
        {
			lock (_lockObject)
			{
				if (currentEntity != null)
				{
					var items = new List<T>() { currentEntity };
					_cache.Set(key, items, EXPIRES_CACHE);
				}
			}
		}
    }

    public static async Task<T> GetOrSet<T>(string key, Func<Task<T>> getItemCallback)
	{
        if (!_cache.Contains(key) || (T)_cache.Get(key) == null)
        {
            lock (_lockObject)
            {
                if (!_cache.Contains(key) || (T)_cache.Get(key) == null)
                {
                    T item = getItemCallback().Result;

					if(item != null)
					{
						_cache.Set(key, item, EXPIRES_CACHE);
					}
                }
            }
        }

		return (T)_cache.Get(key);
    }

    public static async Task Remove<T>(string key) where T : Entity<T>
	{
		if (_cache.Contains(key))
		{
			UpdateAllEntities((T)_cache.Get(key), default(T));
			_cache.Remove(key);
		}
	}

	public static async Task Update<T>(string key, Func<Task<T?>> getItemCallback) where T : Entity<T>
	{
		T previousEntity = default;
		var entity = await getItemCallback();

		if (_cache.Contains(key))
		{
			previousEntity = (T)_cache.Get(key);
			_cache.Remove(key);
		}

		if (entity != null)
		{
			_cache.Set(key, entity, EXPIRES_CACHE);
			UpdateAllEntities(previousEntity, entity);
		}
	}

	public static async Task Create<T>(string key, Func<Task<T?>> getItemCallback) where T : Entity<T>
	{
		var entity = await getItemCallback();

		if (entity != null)
		{
			_cache.Set(key, entity, EXPIRES_CACHE);
			UpdateAllEntities(default(T), entity);
		}
	}


	#region OLD LOGIC INDEX
	public static async Task Remove<T>(string key, Func<Task> removeItemCallback) where T : Entity<T>
	{
		await removeItemCallback();
		if (_cache.Contains(key))
		{
			UpdateAllEntities<T>((T)_cache.Get(key), default(T));
			_cache.Remove(key);
		}
	}

	public static async Task Update<T>(string key, Func<Task> updateItemCallback, Func<Task<T?>> getItemCallback) where T : Entity<T>
	{
		await updateItemCallback();

		T previousEntity = default;
		var entity = await getItemCallback();

		if (_cache.Contains(key))
		{
			previousEntity = (T)_cache.Get(key);
			_cache.Remove(key);
		}

		if (entity != null)
		{
			_cache.Set(key, entity, EXPIRES_CACHE);
			UpdateAllEntities<T>(previousEntity, entity);
		}
	}

	public static async Task Create<T>(string key, Func<Task> createItemCallback, Func<Task<T?>> getItemCallback) where T : Entity<T>
	{
		await createItemCallback();
		var entity = await getItemCallback();

		if (entity != null)
		{
			_cache.Set(key, entity, EXPIRES_CACHE);
			UpdateAllEntities<T>(default(T), entity);
		}
	}

	#endregion
}
