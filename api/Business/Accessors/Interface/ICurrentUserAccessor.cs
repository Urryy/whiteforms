using Common.Entities;

namespace Business.Accessors.Interface;

public interface ICurrentUserAccessor
{
	User GetCurrentUser();
}
