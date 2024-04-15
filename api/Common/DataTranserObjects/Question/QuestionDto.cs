using Common.DataTranserObjects.Form;
using Common.DataTranserObjects.Option;

namespace Common.DataTranserObjects.Question;

public class QuestionDto
{
    public Guid Id { get; set; }
    public Guid FormId { get; set; }
    public string Text { get; set; }
    public string Type { get; set; }
    public bool Open { get; set; }
    public bool Required { get; set; }
    public int Points { get; set; }
    public string AnswerKey { get; set; }
    public bool Answer { get; set; }
    public FormDto Form { get; set; }
    public ICollection<OptionDto> Options { get; set; }
}
