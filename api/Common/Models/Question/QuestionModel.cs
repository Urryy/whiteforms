using Common.Models.Option;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models.Question;

public class QuestionModel
{
    public string Text { get; set; } = default!;
    public string QuestionType { get; set; } = default!;
    public bool Open { get; set; }
    public bool Required { get; set; }
    public int Points { get; set; }
    public string AnswerKey { get; set; } = default!;
    public bool Answer { get; set; }
    public List<OptionModel> Options { get; set; } = default!;
}
