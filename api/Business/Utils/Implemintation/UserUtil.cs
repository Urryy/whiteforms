using Business.Service.Interfaces.User;
using Business.Utils.Interfaces;
using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utils.Implemintation;

public class UserUtil : IUserUtil
{
	private readonly IServiceProvider _srvcProvider;

	public UserUtil(IServiceProvider srvcProvider)
	{
		_srvcProvider = srvcProvider;		
	}

	public User GetCurrentUser(HttpContext? context)
	{
		var domain = context?.User.Identity?.Name?.ToLower();
		if (domain == null)
		{
			throw new NullReferenceException("User not recognized");
		}

		if (!domain.Contains("ST_DOMAIN"))
		{
			domain = $"ST_DOMAIN\\{domain}";
		}

		var srvcUser = _srvcProvider.GetRequiredService<IUserService>();
		var user = srvcUser.GetByExpressionAsync(u => u.Login.Equals(domain), srvcUser.GetFetch<IFetchUser>());
		if (user.Result == null)
		{
			throw new ArgumentException("User doesn't exist");
		}

		return user.Result;
	}
}
