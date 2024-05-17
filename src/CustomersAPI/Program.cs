using Core.Utils;
using Microsoft.EntityFrameworkCore;
using Repository.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<CustomerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQL"))
      .EnableSensitiveDataLogging(true)
           .EnableDetailedErrors(true)
           , ServiceLifetime.Transient
);

//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseCors("AllowReact");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

try
{
   DbInitializer.InitDb(app, builder.Configuration.GetConnectionString("url"));
}
catch (Exception e)
{
    Console.WriteLine(e);
}


app.Run();
