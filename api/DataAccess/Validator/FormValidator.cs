using Common.Models.Form;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
