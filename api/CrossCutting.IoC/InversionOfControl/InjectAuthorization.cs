using Microsoft.AspNetCore.Builder;

namespace CrossCutting.IoC.InversionOfControl;

public static class InjectAuthorization
{
    public static WebApplicationBuilder ConnectAuthorization(this WebApplicationBuilder builder)
    {
        return builder;
    }
}
