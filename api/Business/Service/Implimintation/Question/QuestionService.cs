using Business.Service.Interfaces.Question;
using DataAccess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.Question;

using Question = Common.Entities.Question;

public class QuestionService : GenericServiceAsync<Question>, IQuestionService
{
    public QuestionService(IUnitOfWork uoW) : base(uoW)
    {
    }
}
