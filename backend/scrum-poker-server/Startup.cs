using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using scrum_poker_server.Data;
using scrum_poker_server.Hubs;
using scrum_poker_server.HubServices;
using scrum_poker_server.Utils.Jwt;
using System.Security.Claims;
using System.Text;

namespace scrum_poker_server
{
    public class Startup
    {
        public IConfiguration _configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
                  {
                      builder.SetIsOriginAllowed(_ => true)
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                  }));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]))
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("OfficialUsers", policyBuilder =>
                {
                    policyBuilder.RequireClaim(ClaimTypes.Email);
                });

                options.AddPolicy("AllUsers", policyBuilder =>
                {
                    policyBuilder.RequireClaim("UserId");
                });
            });

            services.AddControllers();
            services.AddDbContext<AppDbContext>(options => options.UseNpgsql(_configuration.GetConnectionString("ScrumPokerConnection")));
            services.AddSignalR();
            services.AddSingleton<RoomService>();
            services.AddSingleton<JwtTokenGenerator>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors("MyPolicy");

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                    {
                        await context.Response.WriteAsync("Web APIs of scrum poker");
                    });

                endpoints.MapHub<Room>("/room");

                endpoints.MapControllers();
            });
        }
    }
}
