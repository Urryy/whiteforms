namespace Business.Service.Interfaces.Option;

using Common.Models.Question;
using Option = Common.Entities.Option;

public interface IOptionService : IGenericServiceAsync<Option>
{
	Task AddOptionsFromQuestion(QuestionModel question, Guid questionId);
}
