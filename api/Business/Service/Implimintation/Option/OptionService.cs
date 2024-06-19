using Business.Service.Interfaces.ElementStyle;
using Business.Service.Interfaces.ImageWrapper;
using Business.Service.Interfaces.Option;
using Common.Enums;
using Common.Models.Question;
using DataAccess.Repository.Interfaces;

namespace Business.Service.Implimintation.Option;

using Option = Common.Entities.Option;
using ImageWrapper = Common.Entities.ImageWrapper;
using ElementStyle = Common.Entities.ElementStyle;

public class OptionService : GenericServiceAsync<Option>, IOptionService
{
	private readonly IElementStyleService _srvcElementStyle;
	private readonly IImageWrapperService _srvcImageWrapper;

    public OptionService(IUnitOfWork uoW, IServiceProvider srvcProvider,
		IElementStyleService srvcElementStyle, IImageWrapperService srvcImageWrapper) : base(uoW, srvcProvider)
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
			if(option.ClassNames != null)
			{
				newOption.ClassNames = string.Join(" ", option.ClassNames);
			}
			await AddAsync(newOption);

			if (option.ImageWrapper != null)
			{
				var wrapper = new ImageWrapper(option.ImageWrapper.Width, option.ImageWrapper.Height, option.ImageWrapper.Position, newOption.Id);
				await _srvcImageWrapper.AddAsync(wrapper);
			}
			
			optionSequence++;
		}
	}
}
