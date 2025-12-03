using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class Client
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public int AgentId { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public string Phone { get; set; }
    [Required]
    public string Email { get; set; }
}
