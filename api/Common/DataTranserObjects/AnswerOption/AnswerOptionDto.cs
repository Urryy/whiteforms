using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTranserObjects.AnswerOption;

using AnswerOption = Entities.AnswerOption;

public class AnswerOptionDto
{
	public Guid Id { get; set; }
	public Guid AnswerQuestionId { get; set; }
	public Guid OptionId { get; set; }
	public string Answer { get; set; } = default!;

	public static AnswerOptionDto EntityToDto(AnswerOption entity)
	{
		var dto = new AnswerOptionDto();
		dto.Id = entity.Id;
		dto.AnswerQuestionId = entity.AnswerQuestionId;
		dto.OptionId = entity.OptionId;
		dto.Answer = entity.Answer;
		return dto;
	}
}
