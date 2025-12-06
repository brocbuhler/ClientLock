using System.ComponentModel.DataAnnotations;
namespace ClientLock.models.DTO;
public class MeetingDTO
{
    public int Id { get; set; }
    [Required]
    public DateTime MeetingTime { get; set; }
    [Required]
    public int AgentId { get; set; }
    public AgentDTO Agent { get; set; }
    [Required]
    public int ClientId { get; set; }
    public ClientDTO Client{ get; set; }
    [Required]
    public int LawPracticeId { get; set; }
    public LawPracticeDTO LawPractice { get; set; }
    [Required]
    public string ConsultingOn { get; set; }
}
