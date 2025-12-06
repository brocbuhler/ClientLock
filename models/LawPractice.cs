using System.ComponentModel.DataAnnotations;
namespace ClientLock.models;
public class LawPractice
{
    public int Id { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public string Description { get; set; }
}
