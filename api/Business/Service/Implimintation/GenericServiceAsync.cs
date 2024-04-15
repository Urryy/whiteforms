using Business.Service.Interfaces;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation;

public class GenericServiceAsync<TEntity> : ReadServiceAsync<TEntity>, IGenericServiceAsync<TEntity>
    where TEntity : class
{
    public GenericServiceAsync(IUnitOfWork uoW) : base(uoW)
    {
    }

    public async Task AddAsync(TEntity entity)
    {
        await _uoW.Repository<TEntity>().AddAsync(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _uoW.Repository<TEntity>().DeleteAsync(id);
    }

    public async Task UpdateAsync(TEntity entity)
    {
        await _uoW.Repository<TEntity>().UpdateAsync(entity);
    }
}
