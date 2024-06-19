using Business.Service.Interfaces.AnswerForm;
using Business.Service.Interfaces.AnswerQuestion;
using Common.Models.AnswerForm;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.AnswerForm;

using AnswerForm = Common.Entities.AnswerForm;

public class AnswerFormService : GenericServiceAsync<AnswerForm>, IAnswerFormService
{
	private readonly IAnswerQuestionService _srvcAnswerQuestion;
	public AnswerFormService(IUnitOfWork uoW, IServiceProvider srvcProvider, 
							 IAnswerQuestionService srvcAnswerQuestion) 
		: base(uoW, srvcProvider)
	{
		_srvcAnswerQuestion = srvcAnswerQuestion;
	}

	public async Task CreateAnswerFormByUserId(AnswerFormModel model)
	{
		var answerForm = new AnswerForm(model.FormId);
		await AddAsync(answerForm);
		await _srvcAnswerQuestion.CreateAnswerQuestionFromForm(model.FilledQuestions, answerForm.Id);
	}
}
