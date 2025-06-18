using Microsoft.EntityFrameworkCore;
using MiraGames.Backend.Data;

namespace MiraGames.Backend.Endpoints;

public static class PaymentEndpoints
{
    public static void MapPaymentEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/payments", async (AppDbContext db, int take = 5, long? clientId = null) =>
        {
            var paymentsQuery = clientId is null ? db.Payments : db.Payments.Where(x => x.ClientId == clientId);

            var payments = await paymentsQuery
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