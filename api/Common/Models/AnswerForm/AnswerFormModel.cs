using Common.Models.AnswerQuestion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models.AnswerForm;

public class AnswerFormModel
{
	public Guid FormId { get; set; }
	public List<AnswerQuestionModel> FilledQuestions { get; set; } = new List<AnswerQuestionModel>();
}
