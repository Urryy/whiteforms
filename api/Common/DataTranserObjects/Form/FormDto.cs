using Common.DataTranserObjects.Question;

namespace Common.DataTranserObjects.Form;

public class FormDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<QuestionDto> Questions { get; set; }
}
