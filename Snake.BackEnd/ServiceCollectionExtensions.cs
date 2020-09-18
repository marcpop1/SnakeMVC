using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd
{
    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection RegisterDataServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SnakeDBContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SnakeDBContext")));

            return services;
        }

    }
}
