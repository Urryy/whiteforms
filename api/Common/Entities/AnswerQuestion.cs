using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class AnswerQuestion : Entity<AnswerQuestion>
{
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public Guid QuestionId { get; set; }
	public Guid AnswerFormId { get; set; }
	public int Sequence { get; set; }
	public AnswerForm AnswerForm { get; set; }	
	public Question Question { get; set; }
	public ICollection<AnswerOption> AnswerOptions { get; set; }
	
	protected AnswerQuestion()
	{}

	public AnswerQuestion(Guid answerFormId, Guid questionId, int sequence)
	{
		AnswerFormId = answerFormId;
		QuestionId = questionId;
		Sequence = sequence;
	}

	public override AnswerQuestion SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
