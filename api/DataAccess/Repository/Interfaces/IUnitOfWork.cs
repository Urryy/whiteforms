using Common.Entities;
using DataAccess.Repository.Implemintations;

namespace DataAccess.Repository.Interfaces;

public interface IUnitOfWork
{
    Task SaveChangesAsync();
    GenericCacheRepository<TEntity> Repository<TEntity>() where TEntity : Entity<TEntity>;
}
