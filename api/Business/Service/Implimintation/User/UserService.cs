using Business.Service.Interfaces.User;
using Business.Utils.Interfaces;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.User;

using User = Common.Entities.User;

public class UserService : GenericServiceAsync<User>, IUserService
{
	public UserService(IUnitOfWork uoW, IServiceProvider srvcProvider, IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory) 
		: base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
	}
}
