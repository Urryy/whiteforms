using Common.Entities;

namespace Business.Service.Interfaces;

public interface IGenericServiceAsync<TEntity> : IReadServiceAsync<TEntity>
    where TEntity : Entity<TEntity>
{
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(Guid id);
}
