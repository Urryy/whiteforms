﻿using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Fetch;

public interface IFetch<TEntity> where TEntity : Entity<TEntity>
{
    IQueryable<TEntity> AcceptQuery(IQueryable<TEntity> query);
}
