using Microsoft.EntityFrameworkCore;
using MiraGames.Backend.Data;
using MiraGames.Backend.Models;

namespace MiraGames.Backend.Endpoints;

public static class RateEndpoints
{
    public static void MapRateEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/rate");

        // GET /rate
        group.MapGet("/", async (AppDbContext db) =>
        {
            var rate = await db.Rates.FirstOrDefaultAsync();
            return rate is null ? Results.NotFound() : Results.Ok(rate);
        });

        // POST /rate
        group.MapPost("/", async (AppDbContext db, Rate updatedRate) =>
        {
            var existing = await db.Rates.FirstOrDefaultAsync();

            if (existing is null)
            {
                var newRate = new Rate
                {
                    Value = updatedRate.Value,
                    UpdatedAt = DateTime.UtcNow
                };
                db.Rates.Add(newRate);
                await db.SaveChangesAsync();
                return Results.Ok(newRate);
            }

            existing.Value = updatedRate.Value;
            existing.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(existing);
        });
    }
}