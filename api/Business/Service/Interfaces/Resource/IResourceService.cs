using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Interfaces.Resource;

using Resource = Common.Entities.Resource;

public interface IResourceService : IGenericServiceAsync<Resource>
{
}
