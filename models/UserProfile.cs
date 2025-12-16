using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ClientLock.models;

public class UserProfile
{
    public int Id { get; set; }
    [Required]
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public int ClientId { get; set;}
    public int AgentId { get; set; }
}
