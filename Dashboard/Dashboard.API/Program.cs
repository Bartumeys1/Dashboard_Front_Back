using Dashboard.API.Infrastructure.AutoMapper;
using Dashboard.API.Infrastructure.Repositories;
using Dashboard.API.Infrastructure.Services;
using Dashboard.Data.Data.Context;
using Dashboard.Data.Data.Models;
using Dashboard.Data.Initializer;
using Dashboard.Services.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add dababase context
builder.Services.AddDbContext<AppDbContext>();

// Jwr configuration
builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));
var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtConfig:Secret"]);
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
    ValidateLifetime = false,
    RequireExpirationTime = false,

    // Allow to use seconds for expiration of token
    // Required only when token lifetime less than 5 minutes
    // THIS ONE
    ClockSkew = TimeSpan.Zero
};

builder.Services.AddSingleton(tokenValidationParameters);

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt => {
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = tokenValidationParameters;
});

// Add AutoMapper configuration 
AutoMapperConfiguration.Config(builder.Services);

//Add Services configuration
ServicesConfiguration.Config(builder.Services);

// Add Repositories configuration
RepositoriesConfiguration.Config(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


string folder = Path.Combine(app.Environment.ContentRootPath, "wwwroot\\images");
if (!Directory.Exists(folder))
{
    Directory.CreateDirectory(folder);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
   Path.Combine(app.Environment.ContentRootPath, "wwwroot")),
    RequestPath = "/StaticFiles"
});


app.UseCors(options => options
    .WithOrigins("http://localhost:3000" , "http://194.44.93.225", "http://77.123.48.13")
    .AllowAnyHeader()
    .AllowCredentials()
    .AllowAnyMethod()
);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();



app.MapRazorPages();
app.MapControllers();

await AppDbInitializer.Seed(app);
app.Run();

