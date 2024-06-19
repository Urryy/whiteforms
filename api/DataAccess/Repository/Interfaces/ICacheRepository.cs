using Common.Entities;
using Common.Enums;
using DataAccess.Fetch;

namespace DataAccess.Repository.Interfaces;

public interface ICacheRepository<T> where T : Entity<T>
{
    Task<T?> GetByIdFromCacheAsync(Guid id, IFetch<T> fetch = null, bool isTracked = true);

	Task<List<T>> GetAllFromCacheAsync(IFetch<T> fetch = null, bool isTracked = true);
    Task DeleteEntityAsync(Guid id);
    Task UpdateEntityAsync(T entity);
    Task CreateEntityAsync(T entity);
    Task EstablishCacheEntityIndex(Guid id, DatabaseOperationType operationType);
}
