
namespace Business.Service.Interfaces.AnswerForm;

using Common.Models.AnswerForm;
using AnswerForm = Common.Entities.AnswerForm;

public interface IAnswerFormService : IGenericServiceAsync<AnswerForm>
{
	Task CreateAnswerFormByUserId(AnswerFormModel model);
}
