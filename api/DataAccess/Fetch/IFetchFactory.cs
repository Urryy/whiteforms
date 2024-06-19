using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Fetch;

public interface IFetchFactory
{
	IFetch<TEntity>? GetCreateFetch<TEntity>(TEntity entity) where TEntity : Entity<TEntity>;
	IFetch<TEntity>? GetUpdateFetch<TEntity>(TEntity entity) where TEntity : Entity<TEntity>;
}
