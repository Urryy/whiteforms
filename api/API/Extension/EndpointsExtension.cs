using API.MinimalApi;

namespace API.Extension;

public static class EndpointsExtension
{
    public static WebApplication RegisterEndpoints(this WebApplication app)
    {
        app.RegisterFormApi();
        app.RegistereAnswerFormApi();
        return app;
    }
}
