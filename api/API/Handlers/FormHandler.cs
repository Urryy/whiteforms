using Business.Accessors.Interface;
using Business.Service.Interfaces.Form;
using Business.Service.Interfaces.User;
using Common.Enums;
using Common.Models.Form;
using Microsoft.AspNetCore.Mvc;

namespace API.Handlers;

public class FormHandler
{
    public static async Task<IResult> CreateForm([FromBody] FormModel model, IFormService srvcForm)
    {
        var uuidForm = await srvcForm.CreateForm(model);
        return Results.Json(new { FormId = uuidForm });
    }

    public static async Task<IResult> GetForms(IFormService srvcForm, ICurrentUserAccessor accessor, IUserJoinRoleService srvcRole)
    {
        var forms = await srvcForm.GetForms();
        return Results.Json(forms);
    }

    public static async Task<IResult> GetFormById([FromRoute] Guid objectId, IFormService srvcForm)
    {
        var form = await srvcForm.GetForm(objectId);
        return Results.Json(form);
    }

    public static async Task<IResult> DeleteForm([FromRoute] Guid objectId, IFormService srvcForm)
    {
        await srvcForm.DeleteAsync(objectId);
        await srvcForm.EstablishIndexEntity(objectId, DatabaseOperationType.Delete);
        return Results.Ok();
    }

    public static async Task<IResult> UpdateForm([FromBody] FormUpdateModel model, IFormService srvcForm)
    {
		var uuidForm = await srvcForm.UpdateForm(model);
		return Results.Json(new { FormId = uuidForm });
	}

	public static async Task<IResult> ChangeStateAccept([FromRoute] Guid objectId, [FromQuery] bool state, IFormService srvcForm)
    {
        await srvcForm.UpdateState(objectId, state);
        return Results.Ok();
    }
}
