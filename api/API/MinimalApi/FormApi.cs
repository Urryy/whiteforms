using API.Attributes;
using API.Handlers;
using Common.Models.Form;

namespace API.MinimalApi;

public static class FormApi
{
    private const string ENDPOINT_V1 = "api/v1/form";

    public static void RegsterFormApi(this WebApplication app)
    {
        app.MapPost($"{ENDPOINT_V1}", FormHandler.CreateForm)
            .AddEndpointFilter<ValidationAttribute<FormModel>>();

        app.MapGet($"{ENDPOINT_V1}", FormHandler.GetForms);

        app.MapGet($"{ENDPOINT_V1}/{{objectId:Guid}}", FormHandler.GetFormById);

        app.MapDelete($"{ENDPOINT_V1}/{{objectId:Guid}}", FormHandler.DeleteForm);

        app.MapPatch($"{ENDPOINT_V1}", FormHandler.UpdateForm);
    }
}
