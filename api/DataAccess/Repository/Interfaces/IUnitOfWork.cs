using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.Interfaces;

public interface IUnitOfWork
{
    Task SaveChangesAsync();
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : class; 
}
