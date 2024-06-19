using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models.AnswerOption;

public class AnswerOptionModel
{
	public Guid OptionId { get; set; }
	public string AnswerText { get; set; } = default!;
}
