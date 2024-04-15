using Common.Models.Question;

namespace Common.Models.Form;

public class FormUpdateModel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public List<QuestionUpdateModel> Questions { get; set; } = default!;
}
