using Business.Service.Interfaces.ElementStyle;
using Business.Service.Interfaces.ImageWrapper;
using Business.Service.Interfaces.Option;
using Business.Service.Interfaces.Question;
using Business.Utils.Interfaces;
using Common.Entities;
using Common.Enums;
using Common.Models.Question;
using DataAccess.Extension;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Implimintation.Question;

using Question = Common.Entities.Question;
using ElementStyle = Common.Entities.ElementStyle;
using ImageWrapper = Common.Entities.ImageWrapper;

public class QuestionService : GenericServiceAsync<Question>, IQuestionService
{
	private readonly IOptionService _srvcOption;
	private readonly IElementStyleService _srvcElementStyle;
	private readonly IImageWrapperService _srvcImageWrapper;

    public QuestionService(IUnitOfWork uoW, IServiceProvider srvcProvider,
		IOptionService srvcOption, IElementStyleService srvcElementStyle,
		IUserUtil userUtil, IHttpContextAccessor context, 
		IImageWrapperService srvcImageWrapper, IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
    {
		_srvcOption = srvcOption;
		_srvcElementStyle = srvcElementStyle;
		_srvcImageWrapper = srvcImageWrapper;
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

			if(question.QuestionImage != null)
			{
				newQuestion.QuestionImage = question.QuestionImage;
			}

			if(question.ImageWrapper != null)
			{
				var wrapper = new ImageWrapper(question.ImageWrapper.Width, question.ImageWrapper.Height, question.ImageWrapper.Position);
				await _srvcImageWrapper.AddAsync(wrapper);
				newQuestion.ImageWrapperId = wrapper.Id;
			}

			await AddAsync(newQuestion);

			await _srvcOption.AddOptionsFromQuestion(question, newQuestion.Id);
			questionSequence++;
		}
	}
}
