using Business.Service.Interfaces.ElementStyle;
using DataAccess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.ElementStyle;

using ElementStyle = Common.Entities.ElementStyle;

public class ElementStyleService : GenericServiceAsync<ElementStyle>, IElementStyleService
{
	public ElementStyleService(IUnitOfWork uoW, 
		IServiceProvider srvcProvider) : base(uoW, srvcProvider)
	{
	}
}
