using ClientLock.models;
using ClientLock.Data;
using ClientLock.models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ClientLock.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AgentController : ControllerBase
{
    private ClientLockDbContext _dbContext;

    public AgentController(ClientLockDbContext context)
    {
        _dbContext = context;
    }

[HttpGet]
[Authorize]
public IActionResult Get()
{
    return Ok(_dbContext.Agents
        .Include(a => a.AgentLawPractices)
            .ThenInclude(alp => alp.LawPractice)
        .Select(a => new AgentDTO
        {
            Id = a.Id,
            FirstName = a.FirstName,
            LastName = a.LastName,
            UserProfileId = a.UserProfileId,
            Phone = a.Phone,
            Email = a.Email,
            Image = a.Image,
            AgentLawPractices = a.AgentLawPractices.Select(alp => new AgentLawPracticeDTO
            {
                Id = alp.Id,
                AgentId = alp.AgentId,
                LawPracticeId = alp.LawPracticeId,
                LawPractice = new LawPracticeDTO
                {
                    Id = alp.LawPractice.Id,
                    Type = alp.LawPractice.Type,
                    Description = alp.LawPractice.Description
                }
            }).ToList()
        })
        .ToList());
    }
}