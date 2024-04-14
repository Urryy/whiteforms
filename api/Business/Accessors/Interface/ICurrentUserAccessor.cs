using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Accessors.Interface;

public interface ICurrentUserAccessor
{
    Guid GetCurrentUserId();
}
