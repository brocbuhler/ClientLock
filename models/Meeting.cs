using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class Meeting
{
    public int Id { get; set; }
    [required]
    public DateTime MeetingTime { get; set; }
    [required]
    public int AgentId { get; set; }
    [required]
    public int ClientId { get; set; }
    [required]
    public int LawPracticeId { get; set; }
    [required]
    public string ConsultingOn { get; set; }
}
