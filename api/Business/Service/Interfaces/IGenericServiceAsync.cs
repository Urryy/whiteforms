namespace Business.Service.Interfaces;

public interface IGenericServiceAsync<TEntity> : IReadServiceAsync<TEntity> 
    where TEntity : class
{
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(Guid id);
}
