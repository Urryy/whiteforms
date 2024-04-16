using Common.Models.Option;
using FluentValidation;

namespace DataAccess.Validator;

public class OptionValiadator : AbstractValidator<OptionModel>
{
    public OptionValiadator()
    {
        RuleFor(c => c.OptionText).NotEmpty();
    }
}
