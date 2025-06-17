using MiraGames.Backend.Models;

namespace MiraGames.Backend.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", (LoginRequest login) =>
        {
            // Фиксированные данные из ТЗ
            const string adminEmail = "admin@mirra.dev";
            const string adminPassword = "admin123";

            if (login.Email == adminEmail && login.Password == adminPassword)
            {
                return Results.Ok(new { token = "demo" });
            }

            return Results.Unauthorized();
        });
    }
}