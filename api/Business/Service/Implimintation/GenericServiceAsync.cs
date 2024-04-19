using Business.Service.Interfaces;
using Common.Entities;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation;

public class GenericServiceAsync<TEntity> : ReadServiceAsync<TEntity>, IGenericServiceAsync<TEntity>
    where TEntity : Entity<TEntity>
{
    public GenericServiceAsync(IUnitOfWork uoW, IServiceProvider srvcProvider) : base(uoW, srvcProvider)
    {
    }

    public async Task AddAsync(TEntity entity)
    {
        await _uoW.Repository<TEntity>().CreateEntityAsync(entity);
        await _uoW.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        await _uoW.Repository<TEntity>().DeleteEntityAsync(id);
        await _uoW.SaveChangesAsync();
    }

    public async Task UpdateAsync(TEntity entity)
    {
        await _uoW.Repository<TEntity>().UpdateEntityAsync(entity);
        await _uoW.SaveChangesAsync();
    }
}
