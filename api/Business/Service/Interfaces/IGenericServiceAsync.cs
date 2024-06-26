using Common.Entities;
using Common.Enums;

namespace Business.Service.Interfaces;

public interface IGenericServiceAsync<TEntity> : IReadServiceAsync<TEntity>
    where TEntity : Entity<TEntity>
{
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(Guid id);
    Task EstablishIndexEntity(Guid objectId, DatabaseOperationType operationType, bool isThreadMethod = false);
}
