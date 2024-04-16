using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Fetch.Implemintation;

public class FetchForm : IFetchForm
{
    public IQueryable<Form> AcceptQuery(IQueryable<Form> query)
    {
        return query.Include(f => f.Questions)
                    .ThenInclude(q => q.Options);
    }
}
