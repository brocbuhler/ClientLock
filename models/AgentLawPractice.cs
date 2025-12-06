using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class AgentLawPractice
{
    public int Id { get; set; }
    [Required]
    public int AgentId { get; set; }
    [Required]
    public int LawPracticeId { get; set; }
}
