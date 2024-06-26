using Business.Middlewares;
using Microsoft.AspNetCore.Builder;

namespace CrossCutting.IoC.ConfigureApp;

public static class ConfigureApplication
{
    public static WebApplication ConfigureWebApplication(this WebApplication app)
    {
        app.UseCors(opt => opt.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .SetIsOriginAllowed((host) => true));

        app.UseMiddleware<ExceptionMiddleware>();

        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        return app;
    }
}
