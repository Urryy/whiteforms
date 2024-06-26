using Business.Service.Interfaces.ImageWrapper;
using Business.Utils.Interfaces;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.ImageWrapper;

using ImageWrapper = Common.Entities.ImageWrapper;

public class ImageWrapperService : GenericServiceAsync<ImageWrapper>, IImageWrapperService
{
	public ImageWrapperService(IUnitOfWork uoW, IServiceProvider srvcProvider, IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
	}
}
