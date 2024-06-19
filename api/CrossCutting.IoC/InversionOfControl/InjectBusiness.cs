using Business.Accessors.Implimintation;
using Business.Accessors.Interface;
using Business.Service.Implimintation;
using Business.Service.Implimintation.AnswerForm;
using Business.Service.Implimintation.AnswerOption;
using Business.Service.Implimintation.AnswerQuestion;
using Business.Service.Implimintation.ElementStyle;
using Business.Service.Implimintation.Form;
using Business.Service.Implimintation.ImageWrapper;
using Business.Service.Implimintation.Option;
using Business.Service.Implimintation.Question;
using Business.Service.Interfaces;
using Business.Service.Interfaces.AnswerForm;
using Business.Service.Interfaces.AnswerOption;
using Business.Service.Interfaces.AnswerQuestion;
using Business.Service.Interfaces.ElementStyle;
using Business.Service.Interfaces.Form;
using Business.Service.Interfaces.ImageWrapper;
using Business.Service.Interfaces.Option;
using Business.Service.Interfaces.Question;
using DataAccess.Fetch;
using DataAccess.Fetch.Implemintation;
using DataAccess.Fetch.Interface;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Reflection;
using System.Text.Json.Serialization;

namespace CrossCutting.IoC.InversionOfControl;

public static class InjectBusiness
{
    public static WebApplicationBuilder ConnectBusiness(this WebApplicationBuilder builder)
    {
        builder.Services.InjectServices();
        builder.Services.InjectFetch();
        builder.Services.InjectAccessors();
        builder.Services.InjectLogging();
        builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options => options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
        builder.Services.AddCors();
        return builder;
    }

    private static void InjectServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(IReadServiceAsync<>), typeof(ReadServiceAsync<>));
        services.AddScoped(typeof(IGenericServiceAsync<>), typeof(GenericServiceAsync<>));

        services.AddScoped<IFetchFactory, FetchFactory>();
        services.AddScoped<IFormService, FormService>();
        services.AddScoped<IQuestionService, QuestionService>();
        services.AddScoped<IOptionService, OptionService>();
        services.AddScoped<IImageWrapperService, ImageWrapperService>();
        services.AddScoped<IElementStyleService, ElementStyleService>();
        services.AddScoped<IAnswerFormService, AnswerFormService>();
        services.AddScoped<IAnswerQuestionService, AnswerQuestionService>();
        services.AddScoped<IAnswerOptionService, AnswerOptionService>();
    }

    private static void InjectFetch(this IServiceCollection services)
    {
        services.AddScoped<IFetchForm, FetchForm>();
        services.AddScoped<IFetchQuestion, FetchQuestion>();
        services.AddScoped<IFetchAnswerForm, FetchAnswerForm>();
    }

    private static void InjectAccessors(this IServiceCollection services)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddScoped<ICurrentUserAccessor, CurrentUserAccessor>();
    }

    private static void InjectLogging(this IServiceCollection services)
    {
        services.AddLogging();
        services.AddSingleton(typeof(ILogger), typeof(Logger<Assembly>));
    }
}
