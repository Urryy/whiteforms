using Business.Service.Interfaces.ImageWrapper;
using DataAccess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.ImageWrapper;

using ImageWrapper = Common.Entities.ImageWrapper;

public class ImageWrapperService : GenericServiceAsync<ImageWrapper>, IImageWrapperService
{
	public ImageWrapperService(IUnitOfWork uoW, 
					IServiceProvider srvcProvider) : base(uoW, srvcProvider)
	{
	}
}
