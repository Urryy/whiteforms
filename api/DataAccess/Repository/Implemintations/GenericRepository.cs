using Common.Context;
using DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccess.Repository.Implemintations;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly DbSet<T> _set;

    public GenericRepository(DatabaseContext context) => _set = context.Set<T>();

    public async Task AddAsync(T entity)
    {
        await _set.AddAsync(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _set.FindAsync(id);
        if (entity is null)
            throw new NullReferenceException("There isn't entity");
        _set.Remove(entity);
    }

    public async Task<List<T?>> GetAllAsync(bool isTracked = true)
    {
        IQueryable<T> query = _set;
        if (isTracked)
            query = query.AsNoTracking();

        return await query.ToListAsync();
    }

    public async Task<List<T?>> GetAllByExpressionAsync(Expression<Func<T, bool>> expression, bool isTracked = true)
    {
        IQueryable<T> query = _set;
        if (isTracked)
            query = query.AsNoTracking();

        return await query.Where(expression).ToListAsync();
    }

    public async Task<T?> GetByExpressionAsync(Expression<Func<T, bool>> expression)
    {
        var entity = await _set.FirstOrDefaultAsync(expression);
        return entity;
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        var entity = await _set.FindAsync(id);
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _set.Update(entity);
    }
}
