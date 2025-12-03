using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ClientLock.Models;

public class UserProfile
{
    public int Id { get; set; }
    [Required]
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
}
