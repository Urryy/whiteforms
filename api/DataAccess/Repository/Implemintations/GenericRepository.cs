using Common.Context;
using Common.Entities;
using DataAccess.Fetch;
using DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccess.Repository.Implemintations;

public class GenericRepository<T> : IGenericRepository<T> where T : Entity<T>
{
    private readonly DbSet<T> _set;

    public GenericRepository(DatabaseContext context) => _set = context.Set<T>();

    public async Task<T?> GetByExpressionAsync(Expression<Func<T, bool>> expression, IFetch<T> fetch = null)
    {
        IQueryable<T> query = _set;

        if (fetch != null)
            query = fetch.AcceptQuery(query);

        var entity = await query.FirstOrDefaultAsync(expression);
        return entity;
    }

    public async Task AddAsync(T entity)
    {
        await _set.AddAsync(entity);
    }

    public async Task<T?> GetByIdAsync(Guid id, IFetch<T> fetch)
    {
        IQueryable<T> query = _set;

        if (fetch != null)
            query = fetch.AcceptQuery(query);

        var entity = await query.FirstOrDefaultAsync(i => i.Id == id);
        return entity;
    }

    public async Task<List<T>> GetAllAsync(IFetch<T> fetch, bool isTracked)
    {
        IQueryable<T> query = _set;
        if (isTracked)
            query = query.AsNoTracking();
        if (fetch != null)
            query = fetch.AcceptQuery(query);

        return await query.ToListAsync();
    }

    public async Task<List<T>> GetAllByExpressionAsync(Expression<Func<T, bool>> expression, IFetch<T> fetch, bool isTracked)
    {
        IQueryable<T> query = _set;
        if (isTracked)
            query = query.AsNoTracking();
        if (fetch != null)
            query = fetch.AcceptQuery(query);

        return await query.Where(expression).ToListAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        _set.Update(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _set.FindAsync(id);
        if (entity is null)
            throw new NullReferenceException("There isn't entity");
        _set.Remove(entity);
    }
}
