namespace MiraGames.Backend.Models;

public class Payment
{
    public long Id { get; set; }

    public DateTime Date { get; set; }

    public decimal AmountT { get; set; }

    public long ClientId { get; set; }

    public Client Client { get; set; } = default!;
}