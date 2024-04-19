using Business.Service.Interfaces.Option;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.Option;

using Option = Common.Entities.Option;

public class OptionService : GenericServiceAsync<Option>, IOptionService
{
    public OptionService(IUnitOfWork uoW, IServiceProvider srvcProvider) : base(uoW, srvcProvider)
    {
    }
}
