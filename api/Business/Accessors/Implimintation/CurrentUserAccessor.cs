using Business.Accessors.Interface;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Business.Accessors.Implimintation;

public class CurrentUserAccessor : ICurrentUserAccessor
{
    private readonly IHttpContextAccessor _accessor;

    public CurrentUserAccessor(IHttpContextAccessor accessor)
    {
        _accessor = accessor;
    }

    public Guid GetCurrentUserId()
    {
        var userId = _accessor.HttpContext?.User?.Claims?.FirstOrDefault(user => user.Type == ClaimTypes.NameIdentifier)?.Value;
        if (Guid.TryParse(userId, out var id))
            return id;
        throw new ArgumentException("user doesn't exist");
    }
}
