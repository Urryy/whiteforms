using Common.Models.ElementStyle;
using Common.Models.Question;

namespace Common.Models.Form;

public class FormModel
{
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public List<QuestionModel> Questions { get; set; } = default!;
    public List<string> NameClassNames { get; set; } = default!;    
    public List<string> DescriptionClassNames { get; set; } = default!;
    public string KolontitulImage { get; set; } = default!;
    public string PreviewImage { get; set; } = default!;
    public ElementStyleModel NameElementStyle { get; set; } = default!;
	public ElementStyleModel DescriptionElementStyle { get; set; } = default!;
}
