using System.ComponentModel.DataAnnotations;
namespace ClientLock.models.DTO;
public class MeetingCreateDTO
{
    [Required]
    public DateTime MeetingTime { get; set; }

    [Required]
    public int AgentId { get; set; }

    [Required]
    public int ClientId { get; set; }

    [Required]
    public int LawPracticeId { get; set; }

    [Required]
    public string ConsultingOn { get; set; }
}

