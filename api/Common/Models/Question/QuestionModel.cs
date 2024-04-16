using Common.Models.Option;

namespace Common.Models.Question;

public class QuestionModel
{
    public string QuestionText { get; set; } = default!;
    public string QuestionType { get; set; } = default!;
    public bool Open { get; set; }
    public bool Required { get; set; } = false;
    public int Points { get; set; } = 0;
    public string AnswerKey { get; set; } = default!;
    public bool Answer { get; set; }
    public List<OptionModel> Options { get; set; } = default!;
}
