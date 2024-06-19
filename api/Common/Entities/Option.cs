using System.ComponentModel.DataAnnotations;

namespace Common.Entities;

public class Option : Entity<Option>
{
    [Key]
    public override Guid Id { get; protected set; } = Guid.NewGuid();
    public Guid QuestionId { get; set; }
    public Guid OptionElementStyleId { get; set; }
	public string OptionText { get; set; } = default!;
	public bool? IsAnother { get; set; } = default!;
    public string? ClassNames { get; set; } = default!;
    public int Sequence { get; set; }
	public Question Question { get; set; } = default!;
	public ElementStyle OptionElementStyle { get; set; } = default!;
	public ImageWrapper ImageWrapper { get; set; } = default!;

    protected Option()
    { }

    public Option(Guid questionId, Guid optionElementStyleId, string text, bool? isAnother, int sequence) : this()
    {
        QuestionId = questionId;
        OptionText = text;
        IsAnother = isAnother;
        Sequence = sequence;
        OptionElementStyleId = optionElementStyleId;
    }

    public override Option SetEntityId(Guid id)
    {
        this.Id = id;
        return this;
    }
}
