using Business.Service.Interfaces.AnswerOption;
using Business.Service.Interfaces.AnswerQuestion;
using Common.Models.AnswerQuestion;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.AnswerQuestion;

using AnswerQuestion = Common.Entities.AnswerQuestion;

public class AnswerQuestionService : GenericServiceAsync<AnswerQuestion>, IAnswerQuestionService
{
	private readonly IAnswerOptionService _srvcAnswerOption;
	public AnswerQuestionService(IUnitOfWork uoW, IServiceProvider srvcProvider, IAnswerOptionService srvcAnswerOption) 
		: base(uoW, srvcProvider)
	{
		_srvcAnswerOption = srvcAnswerOption;
	}

	public async Task CreateAnswerQuestionFromForm(List<AnswerQuestionModel> models, Guid answerFormId)
	{
		foreach (var item in models)
		{
			var answerQuestion = new AnswerQuestion(answerFormId, item.QuestionId, item.Sequence);
			await AddAsync(answerQuestion);
			await _srvcAnswerOption.AddOptionFromQuestion(item.Answers, answerQuestion.Id);
		}
	}
}
