using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Fetch.Implemintation;

public class FetchForm : IFetchForm
{
    public IQueryable<WhiteForm> AcceptQuery(IQueryable<WhiteForm> query)
    {
        return query.Include(f => f.Questions)
					.ThenInclude(o => o.Options)
					.Include(f => f.Questions)
					.ThenInclude(q => q.ImageWrapper)
					.Include(f => f.Questions)
					.ThenInclude(q => q.Options)
					.ThenInclude(o => o.OptionElementStyle)
					.Include(f => f.Questions)
					.ThenInclude(q => q.Options)
					.ThenInclude(o => o.ImageWrapper)
					.Include(f => f.Questions)
					.ThenInclude(q => q.QuestionElementStyle)
					.Include(f => f.NameElementStyle)
                    .Include(f => f.DescriptionElementStyle);
    }
}
