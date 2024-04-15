using Business.Service.Interfaces.Question;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.Question;

using Question = Common.Entities.Question;

public class QuestionService : GenericServiceAsync<Question>, IQuestionService
{
    public QuestionService(IUnitOfWork uoW) : base(uoW)
    {
    }
}
