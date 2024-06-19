namespace Business.Service.Interfaces.AnswerQuestion;

using Common.Models.AnswerQuestion;
using AnswerQuestion = Common.Entities.AnswerQuestion;

public interface IAnswerQuestionService : IGenericServiceAsync<AnswerQuestion>
{
	Task CreateAnswerQuestionFromForm(List<AnswerQuestionModel> models, Guid answerFormId);
}
