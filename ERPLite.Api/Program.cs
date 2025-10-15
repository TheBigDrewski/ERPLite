using Microsoft.EntityFrameworkCore;
using ERPLite.Core.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=erplite.db"));

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
