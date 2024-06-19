
namespace Business.Service.Interfaces.AnswerOption;

using Common.Models.AnswerOption;
using AnswerOption = Common.Entities.AnswerOption;

public interface IAnswerOptionService : IGenericServiceAsync<AnswerOption>
{
	Task AddOptionFromQuestion(List<AnswerOptionModel> models, Guid answerQuestionId);
}
