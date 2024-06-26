using Common.DataTranserObjects.ElementStyle;
using Common.DataTranserObjects.Question;
using Common.Models.ElementStyle;
using Common.Models.Question;

namespace Common.DataTranserObjects.Form;

using WhiteForm = Entities.WhiteForm;

public class FormDto
{
    public Guid Id { get; set; }
	public string Name { get; set; } = default!;
	public string Description { get; set; } = default!;
	public List<QuestionDto> Questions { get; set; } = default!;
	public List<string> NameClassNames { get; set; } = default!;
	public List<string> DescriptionClassNames { get; set; } = default!;
	public string KolontitulImage { get; set; } = default!;
	public string PreviewImage { get; set; } = default!;
	public ElementStyleDto NameElementStyle { get; set; } = default!;
	public ElementStyleDto DescriptionElementStyle { get; set; } = default!;
	public ElementStyleDto QuestionElementStyle { get; set; } = default!;

	public static FormDto EntityToDto(WhiteForm entity)
	{
		var dto = new FormDto()
		{
			Id = entity.Id,
			Name = entity.Name,
			Description = entity.Description,
			Questions = entity.Questions.OrderBy(i => i.Sequence).Select(QuestionDto.EntityToDto).ToList(),
			NameClassNames = entity.NameClassNames != null ? entity.NameClassNames.Split(" ").ToList() : new List<string>(),
			DescriptionClassNames = entity.DescriptionClassNames != null ? entity.DescriptionClassNames.Split(" ").ToList() : new List<string>(),
			KolontitulImage = entity.KolontitulImage ?? "",
			PreviewImage = entity.PreviewImage,
			NameElementStyle = ElementStyleDto.EntityToDto(entity.NameElementStyle),
			DescriptionElementStyle = ElementStyleDto.EntityToDto(entity.DescriptionElementStyle),
			QuestionElementStyle = ElementStyleDto.EntityToDto(entity.Questions.First().QuestionElementStyle)
		};
		return dto;
	}
}
