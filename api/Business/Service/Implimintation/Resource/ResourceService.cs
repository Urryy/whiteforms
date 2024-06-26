using Business.Service.Interfaces.Resource;
using Business.Utils.Interfaces;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.Resource;

using Resource = Common.Entities.Resource;

public class ResourceService : GenericServiceAsync<Resource>, IResourceService
{
	public ResourceService(IUnitOfWork uoW, IServiceProvider srvcProvider, IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory)
		: base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
	}
}
