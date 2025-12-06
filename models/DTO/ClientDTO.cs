using System.ComponentModel.DataAnnotations;
namespace ClientLock.models.DTO;
public class ClientDTO
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public int AgentId { get; set; }
    public AgentDTO Agent { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public string Phone { get; set; }
    [Required]
    public string Email { get; set; }
}
