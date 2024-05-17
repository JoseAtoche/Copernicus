namespace CustomersService.DTOs;

public class ClienteDTO
{
    public int Id { get; set; }
    public String Email { get; set; }
    public String First { get; set; }
    public String Last { get; set; }
    public String Company { get; set; }
    public DateTime CreatedAt { get; set; }
    public String Country { get; set; }

}