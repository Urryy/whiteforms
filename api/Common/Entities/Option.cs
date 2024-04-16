using System.ComponentModel.DataAnnotations;

namespace Common.Entities;

public class Option : Entity<Option>
{
    [Key]
    public Guid Id { get; protected set; }
    public Guid QuestionId { get; set; }
    public string OptionText { get; set; }
    public Question Question { get; set; }

    protected Option()
    { }

    public Option(Guid questionId, string text) : this()
    {
        QuestionId = questionId;
        OptionText = text;
    }

    public override Option SetEntityId(Guid id)
    {
        this.Id = id;
        return this;
    }
}
