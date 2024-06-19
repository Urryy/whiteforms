using Common.Models.AnswerOption;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models.AnswerQuestion;

public class AnswerQuestionModel
{
	public Guid QuestionId { get; set; }
	public int Sequence { get; set; }
	public List<AnswerOptionModel> Answers { get; set; } = new List<AnswerOptionModel>();
}
