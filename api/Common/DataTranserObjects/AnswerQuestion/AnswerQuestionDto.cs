using Common.DataTranserObjects.AnswerOption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTranserObjects.AnswerQuestion;

using AnswerQuestion = Entities.AnswerQuestion;

public class AnswerQuestionDto
{
	public Guid Id { get; set; }
	public Guid QuestionId { get; set; }
	public Guid AnswerFormId { get; set; }
	public int Sequence { get; set; }
	public List<AnswerOptionDto> Answers { get; set; } = new List<AnswerOptionDto>();

	public static AnswerQuestionDto EntityToDto(AnswerQuestion entity)
	{
		var dto = new AnswerQuestionDto();
		dto.Id = entity.Id;
		dto.QuestionId = entity.QuestionId;
		dto.AnswerFormId = entity.AnswerFormId;
		dto.Sequence = entity.Sequence;
		dto.Answers = entity.AnswerOptions.Select(AnswerOptionDto.EntityToDto).ToList();
		return dto;
	}
}
