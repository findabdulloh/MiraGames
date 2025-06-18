using Microsoft.EntityFrameworkCore;
using MiraGames.Backend.Data;

namespace MiraGames.Backend.Endpoints;

public static class PaymentEndpoints
{
    public static void MapPaymentEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/payments", async (AppDbContext db, int take = 5, long? clientId = null) =>
        {
            var query = db.Payments.AsQueryable();

            if (clientId is not null)
                query = query.Where(p => p.ClientId == clientId);

            var payments = await query
                .Include(p => p.Client)
                .OrderByDescending(p => p.Date)
                .Take(take)
                .Select(p => new
                {
                    p.Id,
                    p.AmountT,
                    p.Date,
                    ClientId = p.Client.Id,
                    ClientName = p.Client.Name,
                    ClientEmail = p.Client.Email
                })
                .ToListAsync();

            return Results.Ok(payments);
        });
    }
}