using Common.Models.ElementStyle;
using Common.Models.ImageWrapper;
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
	public int? StartScaleValue { get; set; } = default!;
	public string? DescStartScaleValue { get; set; } = default!;
	public int? EndScaleValue { get; set; } = default!;
	public string? DescEndScaleValue { get; set; } = default!;
    public string? QuestionImage { get; set; } = default!;
    public List<string> ClassNames { get; set; } = default!;
	public ElementStyleModel ElementStyle { get; set; } = default!;
    public ImageWrapperModel ImageWrapper { get; set; } = default!;
	public List<OptionModel> Options { get; set; } = default!;
}
