using Business.Service.Interfaces.Form;
using Common.Entities;
using Common.Models.Form;
using Microsoft.AspNetCore.Mvc;

namespace API.Handlers;

public class FormHandler
{
    public static async Task<IResult> CreateForm([FromBody] FormModel model, IFormService srvcForm)
    {
        await srvcForm.CreateForm(model);
        return Results.Ok();
    }

    public static async Task<IResult> GetForms(IFormService srvcForm)
    {
        var forms = await srvcForm.GetAllAsync();
        return Results.Json(forms);
    }

    public static async Task<IResult> GetFormById([FromRoute] Guid objectId, IFormService srvcForm)
    {
        var form = await srvcForm.GetByIdAsync(objectId);
        return Results.Json(form);
    }

    public static async Task<IResult> DeleteForm([FromRoute] Guid objectId, IFormService srvcForm)
    {
        await srvcForm.DeleteAsync(objectId);
        return Results.Ok();
    }

    public static async Task<IResult> UpdateForm([FromBody] FormUpdateModel model, IFormService srvcForm)
    {
        await srvcForm.UpdateForm(model);
        return Results.Ok();
    }
}
