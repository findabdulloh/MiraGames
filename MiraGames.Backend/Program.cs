using Microsoft.EntityFrameworkCore;
using MiraGames.Backend.Data;
using MiraGames.Backend.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Подключение к SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureDeleted(); // Удалить старую базу (на время разработки)
    db.Database.EnsureCreated();
}

// Эндпойнты
app.MapAuthEndpoints();
app.MapClientEndpoints();
app.MapPaymentEndpoints();
app.MapRateEndpoints();

app.Run();