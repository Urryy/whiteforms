using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class Option
{
    [Key]
    public Guid Id { get; set; }
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
}
