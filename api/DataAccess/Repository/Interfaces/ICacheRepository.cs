using Common.Entities;
using DataAccess.Fetch;

namespace DataAccess.Repository.Interfaces;

public interface ICacheRepository<T> where T : Entity<T>
{
    Task<T?> GetByIdFromCacheAsync(Guid id, IFetch<T> fetch = null);
    Task<List<T>> GetAllFromCacheAsync(IFetch<T> fetch = null, bool isTracked = true);
    Task DeleteEntityAsync(Guid id);
    Task UpdateEntityAsync(T entity);
    Task CreateEntityAsync(T entity);
}
