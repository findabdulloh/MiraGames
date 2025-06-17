using Microsoft.EntityFrameworkCore;
using MiraGames.Backend.Models;

namespace MiraGames.Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Client> Clients { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Rate> Rates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>().HasData(
            new Client { Id = 1, Name = "Алиса", Email = "alice@mirra.dev", BalanceT = 100 },
            new Client { Id = 2, Name = "Боб", Email = "bob@mirra.dev", BalanceT = 200 },
            new Client { Id = 3, Name = "Клара", Email = "clara@mirra.dev", BalanceT = 300 }
        );

        modelBuilder.Entity<Payment>().HasData(
            new Payment { Id = 1, ClientId = 1, AmountT = 70, Date = DateTime.UtcNow.AddDays(-3) },
            new Payment { Id = 2, ClientId = 2, AmountT = 150, Date = DateTime.UtcNow.AddDays(-2) },
            new Payment { Id = 3, ClientId = 3, AmountT = 300, Date = DateTime.UtcNow.AddDays(-1) },
            new Payment { Id = 4, ClientId = 1, AmountT = 30, Date = DateTime.UtcNow.AddDays(-1) },
            new Payment { Id = 5, ClientId = 2, AmountT = 50, Date = DateTime.UtcNow.AddDays(-1) }
        );

        modelBuilder.Entity<Rate>().HasData(
            new Rate { Id = 1, Value = 10m, UpdatedAt = DateTime.UtcNow }
        );
    }
}