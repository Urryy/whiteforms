using Business.Service.Interfaces;
using Business.Utils.Interfaces;
using Common.Context;
using Common.Entities;
using Common.Enums;
using DataAccess.Fetch;
using DataAccess.Repository.Implemintations;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Implimintation;

public class GenericServiceAsync<TEntity> : ReadServiceAsync<TEntity>, IGenericServiceAsync<TEntity>
    where TEntity : Entity<TEntity>
{
	public GenericServiceAsync(IUnitOfWork uoW, 
        IServiceProvider srvcProvider, 
        IUserUtil userUtil, 
        IHttpContextAccessor context,
        IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
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

	public async Task EstablishIndexEntity(Guid objectId, DatabaseOperationType operationType, bool isThreadMethod = false)
	{
        if (isThreadMethod)
        {
			EstablishIndexEntityInThread(objectId, operationType);
            await Task.CompletedTask;
        }
        else
        {
			await _uoW.Repository<TEntity>().EstablishCacheEntityIndex(objectId, operationType);
		}
	}

    private void EstablishIndexEntityInThread(Guid objectId, DatabaseOperationType operationType)
    {
		Task.Run(async () =>
		{
            using (var scope = _scopeFactory.CreateScope())
            {
				var dataContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
				var fetchFactory = scope.ServiceProvider.GetRequiredService<IFetchFactory>();
				using (var uoW = new UnitOfWork(dataContext, fetchFactory))
				{
					await uoW.Repository<TEntity>().EstablishCacheEntityIndex(objectId, operationType);
				}
			}
		});
	}
}
