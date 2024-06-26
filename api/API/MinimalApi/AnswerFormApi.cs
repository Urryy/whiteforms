using API.Attributes;
using API.Handlers;
using Common.Models.AnswerForm;

namespace API.MinimalApi;

public static class AnswerFormApi
{
	private const string ENDPOINT_V1 = "api/v1/answerform";
	public static void RegistereAnswerFormApi(this WebApplication app)
	{
		app.MapPost($"{ENDPOINT_V1}", AnswerFormHandler.CreateAnswerForm)
			.AddEndpointFilter<ValidationAttribute<AnswerFormModel>>()
			.RequireAuthorization();

		app.MapGet($"{ENDPOINT_V1}/{{objectId}}", AnswerFormHandler.GetAnswersByFormId)
			.RequireAuthorization();

		app.MapGet($"{ENDPOINT_V1}/response/count/{{objectId}}", AnswerFormHandler.GetCountResponse)
			.RequireAuthorization();
	}
}
