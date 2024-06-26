using Common.DataTranserObjects.ElementStyle;
using Common.DataTranserObjects.Form;
using Common.DataTranserObjects.ImageWrapper;
using Common.DataTranserObjects.Option;
using Common.Models.ElementStyle;
using Common.Models.Option;

namespace Common.DataTranserObjects.Question;

using Question = Entities.Question;

public class QuestionDto
{
    public Guid Id { get; set; }
    public Guid FormId { get; set; }
	public string QuestionText { get; set; } = default!;
	public string QuestionType { get; set; } = default!;
	public bool Open { get; set; }
	public bool Required { get; set; } = false;
	public int Points { get; set; } = 0;
	public string AnswerKey { get; set; } = default!;
	public bool Answer { get; set; }
	public int? StartScaleValue { get; set; } = default!;
	public string? DescStartScaleValue { get; set; } = default!;
	public int? EndScaleValue { get; set; } = default!;
	public string? DescEndScaleValue { get; set; } = default!;
	public string? QuestionImage { get; set; } = default!;
	public List<string> ClassNames { get; set; } = default!;
	public ImageWrapperDto? ImageWrapper { get; set; } = default!;
	public ElementStyleDto ElementStyle { get; set; } = default!;
	public List<OptionDto> Options { get; set; } = default!;

	public static QuestionDto EntityToDto(Question entity)
	{
		var dto = new QuestionDto
		{
			Id = entity.Id,
			FormId = entity.FormId,
			QuestionText = entity.QuestionText,
			QuestionType = entity.QuestionType.ToString().ToLower(),
			Open = entity.Open,
			Required = entity.Required,
			Points = entity.Points,
			AnswerKey = entity.AnswerKey,
			Answer = entity.Answer,
			StartScaleValue = entity.StartScaleValue,
			DescStartScaleValue = entity.DescStartScaleValue,
			EndScaleValue = entity.EndScaleValue,
			DescEndScaleValue = entity.DescEndScaleValue,
			ClassNames = entity.QuestionClassNames != null ? entity.QuestionClassNames.Split(" ").ToList() : new List<string>(),
			ImageWrapper = entity.ImageWrapper != null ? ImageWrapperDto.EntityToDto(entity.ImageWrapper) : null,
			QuestionImage = entity.QuestionImage,
			ElementStyle = ElementStyleDto.EntityToDto(entity.QuestionElementStyle),
			Options = entity.Options.OrderBy(i => i.Sequence).Select(OptionDto.EntityToDto).ToList(),
		};
		return dto;
	}
}
