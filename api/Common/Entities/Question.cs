using Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace Common.Entities;

public class Question : Entity<Question>
{
    [Key]
    public override Guid Id { get; protected set; } = Guid.NewGuid();
    public Guid FormId { get; set; }
    public Guid QuestionElementStyleId { get; set; }

	public string QuestionText { get; set; }
    public QuestionType QuestionType { get; set; }
    public bool Open { get; set; }
    public bool Required { get; set; }
    public int Points { get; set; }
    public string AnswerKey { get; set; }
    public bool Answer { get; set; }
    public int? StartScaleValue { get; set; } = default!;
	public string? DescStartScaleValue { get; set; } = default!;
    public int? EndScaleValue { get; set; } = default!;
    public string? DescEndScaleValue { get; set; } = default!;
    public string? QuestionClassNames { get; set; } = default!;
	public Form Form { get; set; }
    public ElementStyle QuestionElementStyle { get; set; }
    public ICollection<Option> Options { get; set; }
    public int Sequence { get; set; }

    protected Question()
    { }

    public Question(Guid formId, Guid questionElementStyleId, string text, QuestionType type,
        bool open, bool required, int points, string answerKey, bool answer, 
        int? startScalevalue, string? descStartScaleValue, int? endScaleValue, 
        string? descEndScaleValue, int sequence) : this()
    {
        FormId = formId;
        QuestionText = text;
        QuestionType = type;
        Open = open;
        Required = required;
        Points = points;
        AnswerKey = answerKey;
        Answer = answer;
        StartScaleValue = startScalevalue;
        DescStartScaleValue = descStartScaleValue;
        EndScaleValue = endScaleValue;
        DescEndScaleValue = descEndScaleValue;
        Sequence = sequence;
        QuestionElementStyleId = questionElementStyleId;
	}

    public override Question SetEntityId(Guid id)
    {
        this.Id = id;
        return this;
    }
}
