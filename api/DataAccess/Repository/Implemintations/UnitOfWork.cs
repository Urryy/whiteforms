using Common.Context;
using Common.Entities;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implemintations;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly DatabaseContext _context;
    private bool disposed = false;
    public UnitOfWork(DatabaseContext context)
    {
        _context = context;
    }

    public void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
        this.disposed = true;
    }
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public GenericCacheRepository<TEntity> Repository<TEntity>() where TEntity : Entity<TEntity>
    {
        return new GenericCacheRepository<TEntity>(_context);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
