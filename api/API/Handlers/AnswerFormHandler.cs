using Business.Service.Interfaces.AnswerForm;
using Business.Service.Interfaces.Form;
using Common.DataTranserObjects.AnswerForm;
using Common.Models.AnswerForm;
using DataAccess.Extension;
using DataAccess.Fetch.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Handlers;

public class AnswerFormHandler
{
	public static async Task<IResult> CreateAnswerForm([FromBody] AnswerFormModel model, IAnswerFormService srvcAnswerForm)
	{
		await srvcAnswerForm.CreateAnswerFormByUserId(model);
		return Results.Ok();
	}

	public static async Task<IResult> GetAnswersByFormId([FromRoute] Guid objectId, IAnswerFormService srvcAnswerForm)
	{
		var answers = await srvcAnswerForm.GetAllByExpressionAsync(f => f.FormId == objectId, srvcAnswerForm.GetFetch<IFetchAnswerForm>());
		var dtos = answers.Select(AnswerFormDto.EntityToDto).ToList();
		return Results.Ok(dtos);
	}

	public static async Task<IResult> GetCountResponse([FromRoute] Guid objectId, IAnswerFormService srvcAnswerForm, IFormService srvcForm)
	{
		var answers = await srvcAnswerForm.GetAllByExpressionAsync(f => f.FormId == objectId);
		var form = await srvcForm.GetByIdAsync(objectId);
		var AnswerString = AnswerFormExtension.GetAnswerString(answers.Count());
		return Results.Ok(new { AnswerString, state = form?.Accept });
	}
}
