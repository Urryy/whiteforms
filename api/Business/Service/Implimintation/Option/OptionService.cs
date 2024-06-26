using Business.Service.Interfaces.ElementStyle;
using Business.Service.Interfaces.ImageWrapper;
using Business.Service.Interfaces.Option;
using Business.Utils.Interfaces;
using Common.Enums;
using Common.Models.Question;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Implimintation.Option;

using Option = Common.Entities.Option;
using ImageWrapper = Common.Entities.ImageWrapper;
using ElementStyle = Common.Entities.ElementStyle;

public class OptionService : GenericServiceAsync<Option>, IOptionService
{
	private readonly IElementStyleService _srvcElementStyle;
	private readonly IImageWrapperService _srvcImageWrapper;

    public OptionService(IUnitOfWork uoW, IServiceProvider srvcProvider,
		IElementStyleService srvcElementStyle, IImageWrapperService srvcImageWrapper,
		IUserUtil userUtil, IHttpContextAccessor context, IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
		_srvcElementStyle = srvcElementStyle;
		_srvcImageWrapper = srvcImageWrapper;
    }

    public async Task AddOptionsFromQuestion(QuestionModel question, Guid questionId)
    {
		int optionSequence = 0;
		foreach (var option in question.Options)
		{
			var elementStyleOption = new ElementStyle(option.ElementStyle.FontSize, option.ElementStyle.FontFamily, ElementType.Option);
			await _srvcElementStyle.AddAsync(elementStyleOption);

			var newOption = new Option(questionId, elementStyleOption.Id, option.OptionText, option.IsAnother, optionSequence);
			if (option.ClassNames != null)
			{
				newOption.ClassNames = string.Join(" ", option.ClassNames);
			}

			if (option.OptionImage != null)
			{
				newOption.OptionImage = option.OptionImage;
			}

			if (option.ImageWrapper != null)
			{
				var wrapper = new ImageWrapper(option.ImageWrapper.Width, option.ImageWrapper.Height, option.ImageWrapper.Position);
				await _srvcImageWrapper.AddAsync(wrapper);
				newOption.ImageWrapperId = wrapper.Id;
			}
			
			await AddAsync(newOption);

			optionSequence++;
		}
	}
}
