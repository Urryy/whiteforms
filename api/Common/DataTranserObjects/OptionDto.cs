using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTranserObjects;

public class OptionDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public string Text { get; set; }
    public QuestionDto Question { get; set; }
}
