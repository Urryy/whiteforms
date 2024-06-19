using Common.Context;
using Common.Entities;
using DataAccess.Fetch;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implemintations;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly DatabaseContext _context;
    private readonly IFetchFactory _fetchFactory;

    private bool disposed = false;
    public UnitOfWork(DatabaseContext context, IFetchFactory fetchFactory)
    {
        _context = context;
        _fetchFactory = fetchFactory;
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
        return new GenericCacheRepository<TEntity>(_context, _fetchFactory);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
