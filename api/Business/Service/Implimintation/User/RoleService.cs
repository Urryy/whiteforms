using Business.Service.Interfaces.User;
using Business.Utils.Interfaces;
using Common.Entities;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.User;

public class RoleService : GenericServiceAsync<Role>, IRoleService
{
	public RoleService(IUnitOfWork uoW, IServiceProvider srvcProvider, IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory) 
		: base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
	}
}
