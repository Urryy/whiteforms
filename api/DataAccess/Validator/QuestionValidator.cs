using Common.Enums;
using Common.Models.Question;
using DataAccess.Extension;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Validator;

public class QuestionValidator : AbstractValidator<QuestionModel>
{
	public QuestionValidator()
	{
		RuleFor(c => c.Text).NotEmpty();
		RuleFor(c => c.QuestionType).NotEmpty().IsEnumName(typeof(QuestionType));
		RuleFor(c => c.Options).NotEmpty();
	}
}
