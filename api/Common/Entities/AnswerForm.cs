using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class AnswerForm : Entity<AnswerForm>
{
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public Guid FormId { get; set; }
	public DateTime DateFilled { get; set; } = DateTime.Now;
	public Form Form { get; set; }
	public ICollection<AnswerQuestion> AnswerQuestions { get; set; }
	
	protected AnswerForm()
	{ }

	public AnswerForm(Guid formId)
	{
		FormId = formId;
	}

	public override AnswerForm SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
