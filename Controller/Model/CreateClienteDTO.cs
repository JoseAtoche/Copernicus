using System.ComponentModel.DataAnnotations;

namespace CustomersService.DTOs;

public class CreateClienteDTO
{
    [Required]
    public int Id { get; set; }

    [Required]
    public String Email { get; set; }

    [Required]
    public String First { get; set; }

    [Required]
    public String Last { get; set; }

    [Required]
    public String Company { get; set; }

    [Required]
    public DateTime? CreatedAt { get; set; }
    
    [Required]
    public String Country { get; set; }

}