using Common.Context;
using Common.Models.Form;
using Common.Models.Option;
using Common.Models.Question;
using DataAccess.Mapping;
using DataAccess.Repository.Implemintations;
using DataAccess.Repository.Interfaces;
using DataAccess.Validator;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CrossCutting.IoC.InversionOfControl;

public static class InjectDataAccessLayer
{
    public static WebApplicationBuilder ConnectDataAccessLayer(this WebApplicationBuilder builder)
    {
        builder.Services.ConnectDataBase(builder.Configuration);
        builder.Services.InjectAutomapper(builder.Configuration);
        builder.Services.InjectRepositories();
        builder.Services.InjectValidators();
        return builder;
    }

    private static void ConnectDataBase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<DatabaseContext>();
        var sqlConnectString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<DatabaseContext>(db => db.UseSqlServer(sqlConnectString));
    }

    private static void InjectAutomapper(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(MappingProfile));
    }

    private static void InjectRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
    }

    private static void InjectValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<FormModel>, FormValidator>();
        services.AddScoped<IValidator<QuestionModel>, QuestionValidator>();
        services.AddScoped<IValidator<OptionModel>, OptionValiadator>();
    }
}
