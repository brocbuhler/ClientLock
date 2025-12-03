using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class Agent
{
    public int Id { get; set; }
    [required]
    public string FirstName { get; set; }
    [required]
    public string LastName { get; set; }
    public int UserId { get; set; }
    [required]
    public string Phone { get; set; }
    [required]
    public string Email { get; set; }
    public string Image { get; set; }
}
