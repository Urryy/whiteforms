using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Fetch.Implemintation;

public class FetchForm : IFetchForm
{
    public IQueryable<Form> AcceptQuery(IQueryable<Form> query)
    {
        return query.Include(f => f.Questions)
                    .ThenInclude(q => q.Options);
    }
}
