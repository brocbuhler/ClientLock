using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class Meeting
{
    public int Id { get; set; }
    [Required]
    public DateTime MeetingTime { get; set; }
    [Required]
    public int AgentId { get; set; }
    public Agent Agent { get; set; }
    [Required]
    public int ClientId { get; set; }
    [Required]
    public int LawPracticeId { get; set; }
    public LawPractice LawPractice { get; set; }
    [Required]
    public string ConsultingOn { get; set; }
}
