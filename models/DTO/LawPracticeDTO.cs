using System.ComponentModel.DataAnnotations;
namespace ClientLock.models.DTO;
public class LawPracticeDTO
{
    public int Id { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public string Description { get; set; }
}
