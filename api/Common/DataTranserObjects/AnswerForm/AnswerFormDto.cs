using Common.DataTranserObjects.AnswerQuestion;

namespace Common.DataTranserObjects.AnswerForm;

using AnswerForm = Entities.AnswerForm;

public class AnswerFormDto
{
	public Guid Id { get; set; }
	public Guid FormId { get; set; }
	public DateTime DateFilled { get; set; }
	public List<AnswerQuestionDto> AnswerQuestions { get; set; } = new List<AnswerQuestionDto>();

	public static AnswerFormDto EntityToDto(AnswerForm entity)
	{
		var dto = new AnswerFormDto();
		dto.Id = entity.Id;
		dto.FormId = entity.FormId;
		dto.DateFilled = entity.DateFilled;
		dto.AnswerQuestions = entity.AnswerQuestions.OrderBy(a => a.Sequence).Select(AnswerQuestionDto.EntityToDto).ToList();
		return dto;
	}
}
