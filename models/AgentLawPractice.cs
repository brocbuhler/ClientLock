using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class AgentLawPractice
{
    public int Id { get; set; }
    [Required]
    public int AgentId { get; set; }
    public Agent Agent { get; set; }
    [Required]
    public int LawPracticeId { get; set; }
    public LawPractice LawPractice { get; set; }
}
