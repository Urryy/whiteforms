using Common.DataTranserObjects.ElementStyle;
using Common.DataTranserObjects.ImageWrapper;
using Common.DataTranserObjects.Question;
using Common.Models.ElementStyle;
using Common.Models.ImageWrapper;

namespace Common.DataTranserObjects.Option;

using Option = Entities.Option;

public class OptionDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
	public string OptionText { get; set; } = default!;
	public string? OptionImage { get; set; } = default!;
	public bool? IsAnother { get; set; } = default!;
	public ImageWrapperDto? ImageWrapper { get; set; } = default!;
	public ElementStyleDto ElementStyle { get; set; } = default!;

	public static OptionDto EntityToDto(Option entity)
	{
		var dto = new OptionDto
		{
			Id = entity.Id,
			QuestionId = entity.QuestionId,
			OptionText = entity.OptionText,
			IsAnother = entity.IsAnother,
			ImageWrapper = entity.ImageWrapper != null ? ImageWrapperDto.EntityToDto(entity.ImageWrapper) : null,
			OptionImage =  entity.OptionImage,
			ElementStyle = ElementStyleDto.EntityToDto(entity.OptionElementStyle)
		};
		return dto;
	}
}
