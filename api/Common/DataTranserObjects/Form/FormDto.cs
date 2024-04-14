using Common.DataTranserObjects.Question;
using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTranserObjects.Form;

public class FormDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<QuestionDto> Questions { get; set; }
}
