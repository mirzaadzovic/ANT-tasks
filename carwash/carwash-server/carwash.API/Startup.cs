using carwash.API.Security;
using carwash.Model.Context;
using carwash.Repository;
using carwash.Repository.Contracts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carwash.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CarwashDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("carwashDB")));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAuthentication("BearerAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BearerAuthenticationHandler>("BearerAuthentication", null);
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                builder
                .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                );
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "carwash.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "carwash.API v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
