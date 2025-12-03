using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class LawPractice
{
    public int Id { get; set; }
    [required]
    public string Type { get; set; }
    [required]
    public string Description { get; set; }
}
