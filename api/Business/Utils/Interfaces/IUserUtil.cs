using Common.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utils.Interfaces;

public interface IUserUtil
{
	User GetCurrentUser(HttpContext? context);
}
