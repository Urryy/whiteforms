using Business.Service.Interfaces.Option;
using DataAccess.Repository.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.Option;

using Option = Common.Entities.Option;

public class OptionService : GenericServiceAsync<Option>, IOptionService
{
    public OptionService(IUnitOfWork uoW) : base(uoW)
    {
    }
}
