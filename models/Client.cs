using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class Client
{
    public int Id { get; set; }
    [required]
    public string FirstName { get; set; }
    [required]
    public string LastName { get; set; }
    [required]
    public int AgentId { get; set; }
    [required]
    public int UserId { get; set; }
    [required]
    public string Phone { get; set; }
    [required]
    public string Email { get; set; }
}
