using API.MinimalApi;

namespace API.Extension;

public static class EndpointsExtension
{
    public static WebApplication RegisterEndpoints(this WebApplication app)
    {
        app.RegsterFormApi();
        return app;
    }
}
