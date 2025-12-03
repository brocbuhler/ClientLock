using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class AgentLawPractice
{
    public int Id { get; set; }
    [required]
    public int AgentId { get; set; }
    [required]
    public int LawPracticeId { get; set; }
}
