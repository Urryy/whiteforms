using Business.Accessors.Interface;
using Business.Service.Interfaces.User;
using Business.Utils.Interfaces;
using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Business.Accessors.Implimintation;

public class CurrentUserAccessor : ICurrentUserAccessor
{
    private readonly IHttpContextAccessor _accessor;
    private readonly IUserUtil _userUtil;

    public CurrentUserAccessor(IHttpContextAccessor accessor, IUserUtil userUtil)
    {
        _accessor = accessor;
		_userUtil = userUtil;
    }

    public User GetCurrentUser()
    {
        if(_accessor.HttpContext == null)
        {
            throw new ArgumentException("Context not exist");
        }

        return _userUtil.GetCurrentUser(_accessor.HttpContext);
    }
}
