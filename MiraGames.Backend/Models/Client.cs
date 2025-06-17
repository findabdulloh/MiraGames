namespace MiraGames.Backend.Models;

public class Client
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public decimal BalanceT { get; set; } // баланс в токенах

    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}