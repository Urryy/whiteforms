﻿using Common.Entities;
using DataAccess.Fetch;
using System.Linq.Expressions;

namespace Business.Service.Interfaces;

public interface IReadServiceAsync<TEntity>
    where TEntity : Entity<TEntity>
{
    Task<IEnumerable<TEntity>> GetAllAsync(IFetch<TEntity> fetch = null, bool isTracked = false);
    Task<IEnumerable<TEntity>> GetAllByExpressionAsync(Expression<Func<TEntity, bool>> expression, IFetch<TEntity> fetch = null, bool isTracked = false);
    Task<TEntity?> GetByIdAsync(Guid id, IFetch<TEntity> fetch = null, bool isTracked = false);
    Task<TEntity?> GetByExpressionAsync(Expression<Func<TEntity, bool>> expression, IFetch<TEntity> fetch = null);
    Task<int> CountAsync();
    TFetch GetFetch<TFetch>() where TFetch : IFetch<TEntity>;
}
