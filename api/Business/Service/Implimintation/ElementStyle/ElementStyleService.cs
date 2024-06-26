using Business.Service.Interfaces.ElementStyle;
using Business.Utils.Interfaces;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.ElementStyle;

using ElementStyle = Common.Entities.ElementStyle;

public class ElementStyleService : GenericServiceAsync<ElementStyle>, IElementStyleService
{
	public ElementStyleService(IUnitOfWork uoW, IServiceProvider srvcProvider, IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory) 
		: base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
	}
}
