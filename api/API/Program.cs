using API.Extension;
using CrossCutting.IoC.ConfigureApp;
using CrossCutting.IoC.InversionOfControl;

WebApplication.CreateBuilder(args)
        .ConnectDataAccessLayer()
        .ConnectAuthorization()
        .ConnectBusiness()
        .Build()
        .RegisterEndpoints()
        .ConfigureWebApplication()
        .Run();
