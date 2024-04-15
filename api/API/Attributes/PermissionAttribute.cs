using Business.Accessors.Interface;
using Common.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Attributes;

public class PermissionAttribute : TypeFilterAttribute
{
    public PermissionAttribute(params SystemRoleType[] roles) : base(typeof(PermissionRequirementFilter))
    {
        Arguments = new object[] { roles };
    }
}

public class PermissionRequirementFilter : IAuthorizationFilter
{
    private readonly ICurrentUserAccessor _userAccessor;
    private readonly ICollection<SystemRoleType> _roles;
    private readonly ILogger<PermissionRequirementFilter> _logger;

    public PermissionRequirementFilter(SystemRoleType[] roles, ICurrentUserAccessor userAccessor
        , ILogger<PermissionRequirementFilter> logger)
    {
        _roles = roles.ToList();
        _userAccessor = userAccessor;
        _logger = logger;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        //var userId = _accessor.GetCurrentUserId();

        //if (userId != null && Guid.TryParse(userId, out var id))
        //{
        //    var user = _srvcUser.GetAsync(id).Result;
        //    if (_systemRoles.Exists(i => i == user.Role.ToEnum<Role>()))
        //        return;
        //}

        //context.HttpContext.Response.StatusCode = 403;
        //context.Result = new RedirectResult("rankedready/error");
        return;
    }
}
