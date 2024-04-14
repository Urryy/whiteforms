using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CrossCutting.IoC.InversionOfControl;

public static class InjectAuthorization
{
    public static WebApplicationBuilder ConnectAuthorization(this WebApplicationBuilder builder)
    {
        return builder;
    }
}
