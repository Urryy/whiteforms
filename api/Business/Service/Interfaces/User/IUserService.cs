using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Interfaces.User;

using User = Common.Entities.User;

public interface IUserService : IGenericServiceAsync<User>
{
}
