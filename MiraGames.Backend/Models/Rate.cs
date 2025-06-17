namespace MiraGames.Backend.Models;

public class Rate
{
    public int Id { get; set; }

    public decimal Value { get; set; }

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}