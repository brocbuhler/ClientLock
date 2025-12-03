using System.ComponentModel.DataAnnotations;
namespace ClientLock.models.DTO;
public class AgentLawPracticeDTO
{
    public int Id { get; set; }
    [Required]
    public int AgentId { get; set; }
    public AgentDTO Agent { get; set; }
    [Required]
    public int LawPracticeId { get; set; }
    public LawPracticeDTO LawPractice { get; set; }
}
