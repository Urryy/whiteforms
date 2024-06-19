using Business.Service.Interfaces.AnswerForm;
using Common.Models.AnswerForm;
using Microsoft.AspNetCore.Mvc;

namespace API.Handlers;

public class AnswerFormHandler
{
	public static async Task<IResult> CreateAnswerForm([FromBody] AnswerFormModel model, IAnswerFormService srvcAnswerForm)
	{
		await srvcAnswerForm.CreateAnswerFormByUserId(model);
		return Results.Ok();
	}
}
