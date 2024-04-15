using Common.Models.Form;
using FluentValidation;

namespace DataAccess.Validator;

public class FormValidator : AbstractValidator<FormModel>
{
    public FormValidator()
    {
        RuleFor(c => c.Name).NotEmpty().WithMessage("Название формы не может быть пустым");
        RuleFor(c => c.Description).NotEmpty().WithMessage("Описание формы не может быть пустым");
        RuleFor(c => c.Questions).NotEmpty();
    }
}
