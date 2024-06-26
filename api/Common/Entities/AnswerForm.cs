using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class AnswerForm : Entity<AnswerForm>
{
	[Key]
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public Guid FormId { get; set; }
	public Guid ResourceId { get; set; }
	public DateTime DateFilled { get; set; } = DateTime.Now;
	public WhiteForm Form { get; set; }
	public Resource Resource { get; set; }
	public ICollection<AnswerQuestion> AnswerQuestions { get; set; }
	
	protected AnswerForm()
	{ }

	public AnswerForm(Guid formId, Guid resourceId) : this()
	{
		FormId = formId;
		ResourceId = resourceId;
	}

	public override AnswerForm SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
