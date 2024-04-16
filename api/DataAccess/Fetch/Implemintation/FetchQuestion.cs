using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Fetch.Implemintation;

public class FetchQuestion : IFetchQuestion
{
    public IQueryable<Question> AcceptQuery(IQueryable<Question> query)
    {
        return query.Include(query => query.Options);
    }
}
