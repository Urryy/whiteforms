using Common.DataTranserObjects.Question;

namespace Common.DataTranserObjects.Option;

public class OptionDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public string Text { get; set; }
    public QuestionDto Question { get; set; }
}
