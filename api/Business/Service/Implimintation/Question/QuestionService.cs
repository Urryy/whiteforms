using Business.Service.Interfaces.ElementStyle;
using Business.Service.Interfaces.Option;
using Business.Service.Interfaces.Question;
using Common.Entities;
using Common.Enums;
using Common.Models.Question;
using DataAccess.Extension;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.Question;

using Question = Common.Entities.Question;
using ElementStyle = Common.Entities.ElementStyle;

public class QuestionService : GenericServiceAsync<Question>, IQuestionService
{
	private readonly IOptionService _srvcOption;
	private readonly IElementStyleService _srvcElementStyle;

    public QuestionService(IUnitOfWork uoW, IServiceProvider srvcProvider,
		IOptionService srvcOption, IElementStyleService srvcElementStyle) : base(uoW, srvcProvider)
    {
		_srvcOption = srvcOption;
		_srvcElementStyle = srvcElementStyle;
    }

	public async Task AddQuestionsFromForm(List<QuestionModel> questions, Guid formId)
	{
		int questionSequence = 0;
		foreach (var question in questions)
		{
			var elementStyleQuestion = new ElementStyle(question.ElementStyle.FontSize, question.ElementStyle.FontFamily, ElementType.Question);
			await _srvcElementStyle.AddAsync(elementStyleQuestion);

			var newQuestion = new Question(formId, elementStyleQuestion.Id, question.QuestionText, question.QuestionType.ToEnum<QuestionType>(),
				question.Open, question.Required, question.Points, question.AnswerKey, question.Answer, question.StartScaleValue, question.DescStartScaleValue,
				question.EndScaleValue, question.DescEndScaleValue, questionSequence);
			if (question.ClassNames != null)
			{
				newQuestion.QuestionClassNames = string.Join(" ", question.ClassNames);
			}
			await AddAsync(newQuestion);

			await _srvcOption.AddOptionsFromQuestion(question, newQuestion.Id);
			questionSequence++;
		}
	}
}
