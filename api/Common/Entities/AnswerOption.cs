using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class AnswerOption : Entity<AnswerOption>
{
	public override Guid Id { get; protected set; } =  Guid.NewGuid();
	public Guid AnswerQuestionId { get; set; }
	public Guid OptionId { get; set; }
	public string Answer { get; set; }
	public AnswerQuestion AnswerQuestion { get; set; }
	public Option Option { get; set; }

	protected AnswerOption()
	{}

	public AnswerOption(Guid answerQuestionId, Guid optionId, string answer)
	{
		AnswerQuestionId = answerQuestionId;
		OptionId = optionId;
		Answer = answer;
	}

	public override AnswerOption SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
