using Common.Entities;

namespace DataAccess.Fetch;

public interface IFetch<TEntity> where TEntity : Entity<TEntity>
{
    IQueryable<TEntity> AcceptQuery(IQueryable<TEntity> query);
}
