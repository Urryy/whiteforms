using Common.Models.ElementStyle;
using Common.Models.ImageWrapper;

namespace Common.Models.Option;

public class OptionModel
{
    public string OptionText { get; set; } = default!;
    public bool? IsAnother { get; set; } = default!;
    public List<string>? ClassNames { get; set; } = default!; 
    public ImageWrapperModel ImageWrapper { get; set; } = default!;
    public ElementStyleModel ElementStyle { get; set; } = default!;
}
