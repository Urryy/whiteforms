using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Business.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ArgumentOutOfRangeException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (FieldAccessException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (InvalidDataException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (AccessViolationException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (ValidationException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (NullReferenceException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (ArgumentNullException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (ArgumentException exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
        catch (Exception exc)
        {
            _logger.LogError(exc.Message);
            await HandleExceptionAsync(context, exc);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        var message = $"CatchedException: {ex.Message}.";
        await context.Response.WriteAsync(message);
    }
}
