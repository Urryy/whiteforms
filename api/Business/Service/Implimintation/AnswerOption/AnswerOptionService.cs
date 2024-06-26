using Business.Service.Interfaces.AnswerOption;
using Business.Utils.Interfaces;
using Common.Models.AnswerOption;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Implimintation.AnswerOption;

using AnswerOption = Common.Entities.AnswerOption;

public class AnswerOptionService : GenericServiceAsync<AnswerOption>, IAnswerOptionService
{
	public AnswerOptionService(IUnitOfWork uoW, IServiceProvider srvcProvider,
		IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
	}

	public async Task AddOptionFromQuestion(List<AnswerOptionModel> models, Guid answerQuestionId)
	{
		foreach (var item in models)
		{
			var option = new AnswerOption(answerQuestionId, item.OptionId, item.AnswerText);
			await AddAsync(option);
		}
	}
}
