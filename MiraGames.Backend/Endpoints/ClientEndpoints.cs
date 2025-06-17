using Microsoft.EntityFrameworkCore;
using MiraGames.Backend.Data;

namespace MiraGames.Backend.Endpoints;

public static class ClientEndpoints
{
    public static void MapClientEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/clients", async (AppDbContext db) =>
        {
            var clients = await db.Clients.ToListAsync();
            return Results.Ok(clients);
        });
    }
}