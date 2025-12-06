using System.ComponentModel.DataAnnotations;
namespace ClientLock.models.DTO;
public class AgentDTO
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public int UserProfileId { get; set; }
    [Required]
    public string Phone { get; set; }
    [Required]
    public string Email { get; set; }
    public string Image { get; set; }
}
