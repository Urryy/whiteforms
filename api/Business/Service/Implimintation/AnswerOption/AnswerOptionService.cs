using Business.Service.Interfaces.AnswerOption;
using Common.Models.AnswerOption;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.AnswerOption;

using AnswerOption = Common.Entities.AnswerOption;

public class AnswerOptionService : GenericServiceAsync<AnswerOption>, IAnswerOptionService
{
	public AnswerOptionService(IUnitOfWork uoW, IServiceProvider srvcProvider) 
		: base(uoW, srvcProvider)
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
