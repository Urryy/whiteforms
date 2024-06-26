using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace CrossCutting.IoC.InversionOfControl;

public static class InjectAuthorization
{
    public static WebApplicationBuilder ConnectAuthorization(this WebApplicationBuilder builder)
    {
		builder.Services.AddAuthentication(options =>
		{
			options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		})
		.AddCookie(options =>
		{
			options.Cookie.Name = "keycloak.cookie";
			options.Cookie.MaxAge = TimeSpan.FromHours(24);
			options.SlidingExpiration = true;
		})
		.AddJwtBearer(options =>
		{
			options.Authority = $"{builder.Configuration["Keycloack:auth-server-url"]}realms/{builder.Configuration["Keycloack:realm"]}";
			options.Audience = builder.Configuration["Keycloak:resource"];
			options.MetadataAddress = $"{builder.Configuration["Keycloack:auth-server-url"]}realms/{builder.Configuration["Keycloack:realm"]}/.well-known/openid-configuration";
			options.RequireHttpsMetadata = true;
			options.TokenValidationParameters = new TokenValidationParameters
			{
				NameClaimType = "preferred_username",
				RoleClaimType = "roles",
				ValidateAudience = false,
				ValidAudience = builder.Configuration["Keycloak:resource"],
				ValidateIssuer = true,
				ValidIssuers = new[] { $"{builder.Configuration["Keycloack:auth-server-url"]}realms/{builder.Configuration["Keycloack:realm"]}" },
			};
		});

		builder.Services.AddAuthorization();
		return builder;
    }
}
