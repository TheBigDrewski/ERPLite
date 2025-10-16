using Microsoft.EntityFrameworkCore;
using ERPLite.Core.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=erplite.db"));

var app = builder.Build();

app.UseCors("AllowReact");
app.MapControllers();
app.Run();
