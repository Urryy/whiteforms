using Common.Models.Option;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Validator;

public class OptionValiadator : AbstractValidator<OptionModel>
{
	public OptionValiadator()
	{
		RuleFor(c => c.Text).NotEmpty();
	}
}
