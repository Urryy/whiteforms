using API.Attributes;
using API.Handlers;
using Common.Models.Form;

namespace API.MinimalApi;

public static class FormApi
{
    private const string ENDPOINT_V1 = "api/v1/form";

    public static void RegisterFormApi(this WebApplication app)
    {
        app.MapPost($"{ENDPOINT_V1}", FormHandler.CreateForm)
            .AddEndpointFilter<ValidationAttribute<FormModel>>()
			.RequireAuthorization();

        app.MapGet($"{ENDPOINT_V1}", FormHandler.GetForms)
			.RequireAuthorization();

        app.MapGet($"{ENDPOINT_V1}/{{objectId:Guid}}", FormHandler.GetFormById)
            .RequireAuthorization();

        app.MapDelete($"{ENDPOINT_V1}/{{objectId:Guid}}", FormHandler.DeleteForm)
			.RequireAuthorization();

        app.MapPatch($"{ENDPOINT_V1}", FormHandler.UpdateForm)
            .RequireAuthorization();

        app.MapGet($"{ENDPOINT_V1}/{{objectId:Guid}}/state/accept", FormHandler.ChangeStateAccept)
            .RequireAuthorization();
    }
}
