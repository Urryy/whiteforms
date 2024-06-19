namespace Business.Service.Interfaces.Question;

using Common.Models.Question;
using Question = Common.Entities.Question;

public interface IQuestionService : IGenericServiceAsync<Question>
{
	Task AddQuestionsFromForm(List<QuestionModel> questions, Guid formId);
}
