using Common.Context;
using Common.Entities;
using Common.Enums;
using DataAccess.Extension;
using DataAccess.Fetch;
using DataAccess.Managers;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implemintations;

public class GenericCacheRepository<TEntity> : GenericRepository<TEntity>, ICacheRepository<TEntity> where TEntity : Entity<TEntity>
{
    private readonly IFetchFactory _fetchFactory;

    public GenericCacheRepository(DatabaseContext context, IFetchFactory fetchFactory) : base(context) => _fetchFactory = fetchFactory;

    #region GET
    public async Task<List<TEntity>> GetAllFromCacheAsync(IFetch<TEntity> fetch = null, bool isTracked = true)
	{
        return await CacheManager.GetOrSet(
            CacheManagerExtension.GetAllEntityKey<TEntity>(),
            async () => await GetAllAsync(fetch, isTracked));
    }

    public async Task<TEntity?> GetByIdFromCacheAsync(Guid id, IFetch<TEntity> fetch = null, bool isTracked = true)
	{
        var keyEntity = string.Format(CacheManagerExtension.KEY_ENTITY, id);

		return await CacheManager.GetOrSet(
            keyEntity,
            async () => await GetByIdAsync(id, fetch, isTracked));
    }
    #endregion

    public async Task DeleteEntityAsync(Guid id) => await DeleteAsync(id);

	public async Task UpdateEntityAsync(TEntity entity) => await UpdateAsync(entity);

	public async Task CreateEntityAsync(TEntity entity) => await AddAsync(entity);

	public async Task EstablishCacheEntityIndex(Guid id, DatabaseOperationType operationType)
	{
		var keyEntity = string.Format(CacheManagerExtension.KEY_ENTITY, id);
		var entity = await GetByIdAsync(id);

		if (operationType == DatabaseOperationType.Insert && entity != null)
        {
			var fetch = _fetchFactory.GetCreateFetch(entity);
            await CacheManager.Create(keyEntity, async () => await GetByIdAsync(entity.Id, fetch: fetch));
        }

        if (operationType == DatabaseOperationType.Update && entity != null)
        {
			var fetch = _fetchFactory.GetCreateFetch(entity);
            await CacheManager.Update(keyEntity, async () => await GetByIdAsync(entity.Id, fetch: fetch));
		}

        if (operationType == DatabaseOperationType.Delete) 
        {
			await CacheManager.Remove<TEntity>(keyEntity);
        }
	}
}
