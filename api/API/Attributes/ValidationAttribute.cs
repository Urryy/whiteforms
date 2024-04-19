using FluentValidation;

namespace API.Attributes;

public class ValidationAttribute<T> : IEndpointFilter where T : class
{
    private readonly IValidator<T> _validator;

    public ValidationAttribute(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var model = context.Arguments.FirstOrDefault(i => i.GetType() == typeof(T)) as T;
        var resultValidation = await _validator.ValidateAsync(model!);

        if (!resultValidation.IsValid)
        {
            return Results.Json(resultValidation.Errors, statusCode: 400);
        }

        return await next(context);
    }
}
