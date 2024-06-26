using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Fetch.Implemintation;

public class FetchFactory : IFetchFactory
{
	private readonly IServiceProvider _srvcProvider;

	public FetchFactory(IServiceProvider srvcProvider) => _srvcProvider = srvcProvider;

	public IFetch<TEntity>? GetCreateFetch<TEntity>(TEntity entity) where TEntity : Entity<TEntity> => GetFetch(entity);

	public IFetch<TEntity>? GetUpdateFetch<TEntity>(TEntity entity) where TEntity : Entity<TEntity> => GetFetch(entity);

	private IFetch<TEntity>? GetFetch<TEntity>(TEntity entity) where TEntity : Entity<TEntity>
	{
		if (entity is WhiteForm)
		{
			return (IFetch<TEntity>?)_srvcProvider.GetRequiredService<IFetchForm>();
		}
		else if(entity is AnswerForm)
		{
			return (IFetch<TEntity>?)_srvcProvider.GetRequiredService<IFetchAnswerForm>();
		}
		else
		{
			return null;
		}
	}
}
