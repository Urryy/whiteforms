using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Fetch.Implemintation;

public class FetchUser : IFetchUser
{
	public IQueryable<User> AcceptQuery(IQueryable<User> query)
	{
		return query.Include(item => item.UserJoinRole)
					.ThenInclude(item => item.Role)
					.Include(item => item.Resources);
	}
}
