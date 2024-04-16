using Common.Enums;
using Common.Models.Question;
using FluentValidation;

namespace DataAccess.Validator;

public class QuestionValidator : AbstractValidator<QuestionModel>
{
    public QuestionValidator()
    {
        RuleFor(c => c.QuestionText).NotEmpty();
        RuleFor(c => c.QuestionType).NotEmpty().IsEnumName(typeof(QuestionType));
        RuleFor(c => c.Options).NotEmpty();
    }
}
