using System.ComponentModel.DataAnnotations;

namespace Core.Models;

public class CustomerDTO
{
    [Required]
    public int Id { get; set; }

    [Required]
    public required string Email { get; set; }

    [Required]
    public required string First { get; set; }

    [Required]
    public required string Last { get; set; }

    [Required]
    public required string Company { get; set; }

    [Required]
    public required DateTime? CreatedAt { get; set; }

    [Required]
    public required string Country { get; set; }
}