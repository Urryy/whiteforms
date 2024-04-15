using Common.Models.Question;

namespace Common.Models.Form;

public class FormModel
{
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public List<QuestionModel> Questions { get; set; } = default!;
}
