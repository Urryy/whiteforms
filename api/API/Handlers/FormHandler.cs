using Business.Service.Interfaces.AnswerForm;
using Business.Service.Interfaces.Form;
using Common.DataTranserObjects.Form;
using Common.Enums;
using Common.Models.AnswerForm;
using Common.Models.Form;
using DataAccess.Fetch.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Handlers;

public class FormHandler
{
    public static async Task<IResult> CreateForm([FromBody] FormModel model, IFormService srvcForm)
    {
        var uuidForm = await srvcForm.CreateForm(model);
        return Results.Json(new { FormId = uuidForm });
    }

    public static async Task<IResult> GetForms(IFormService srvcForm)
    {
        var forms = await srvcForm.GetAllAsync(srvcForm.GetFetch<IFetchForm>());
        return Results.Json(forms);
    }

    public static async Task<IResult> GetFormById([FromRoute] Guid objectId, IFormService srvcForm)
    {
        var form = await srvcForm.GetByIdAsync(objectId, srvcForm.GetFetch<IFetchForm>());
        if(form == null)
        {
            return Results.BadRequest("Данной формы не существует");
        }
        var dto = FormDto.EntityToDto(form);
        return Results.Json(dto);
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
}
