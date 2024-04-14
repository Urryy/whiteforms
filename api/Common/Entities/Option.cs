using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class Option : Entity<Option>
{
    [Key]
    public Guid Id { get; protected set; }
    public Guid QuestionId { get; set; }
    public string Text { get; set; }
    public Question Question { get; set; }

    protected Option()
    { }

    public Option(Guid questionId, string text) : this()
    {
        QuestionId = questionId; 
        Text = text;
    }

    public override Option SetEntityId(Guid id)
    {
        this.Id = id;
        return this;
    }
}
