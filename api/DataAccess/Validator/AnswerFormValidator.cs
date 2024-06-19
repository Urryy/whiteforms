using Common.Models.AnswerForm;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Validator;

public class AnswerFormValidator : AbstractValidator<AnswerFormModel>
{
	public AnswerFormValidator()
	{
		RuleFor(c => c.FormId).NotEqual(Guid.Empty).WithMessage("Form Id doesn't contain Guid Empty");
		RuleFor(c => c.FilledQuestions).NotEmpty().WithMessage("Form must be filled");
	}
}
