using Business.Service.Interfaces.AnswerForm;
using Business.Service.Interfaces.AnswerQuestion;
using Business.Utils.Interfaces;
using Common.Enums;
using Common.Models.AnswerForm;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Implimintation.AnswerForm;

using AnswerForm = Common.Entities.AnswerForm;

public class AnswerFormService : GenericServiceAsync<AnswerForm>, IAnswerFormService
{
	private readonly IAnswerQuestionService _srvcAnswerQuestion;
	public AnswerFormService(IUnitOfWork uoW, IServiceProvider srvcProvider, 
							 IAnswerQuestionService srvcAnswerQuestion,
							 IUserUtil userUtil, 
							 IHttpContextAccessor context, 
							 IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
		_srvcAnswerQuestion = srvcAnswerQuestion;
	}

	public async Task CreateAnswerFormByUserId(AnswerFormModel model)
	{
		var resource = UserUtil.GetCurrentUser(Context.HttpContext).GetAuthorizedResource();
		var answerForm = new AnswerForm(model.FormId, resource.Id);
		await AddAsync(answerForm);
		await _srvcAnswerQuestion.CreateAnswerQuestionFromForm(model.FilledQuestions, answerForm.Id);
		await EstablishIndexEntity(answerForm.Id, DatabaseOperationType.Insert, true);
	}
}
