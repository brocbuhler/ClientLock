using ClientLock.models;
using ClientLock.Data;
using ClientLock.models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ClientLock.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MeetingController : ControllerBase
{
    private ClientLockDbContext _dbContext;

    public MeetingController(ClientLockDbContext context)
    {
        _dbContext = context;
    }

  [HttpPost]
  [Authorize]
    public IActionResult Create(Meeting meetingToCreate)
    {
        _dbContext.Meetings.Add(meetingToCreate);
        _dbContext.SaveChanges();
        return Created($"api/meeting/{meetingToCreate.Id}", meetingToCreate);
    }

    [HttpGet("{clientId}")]
    public IActionResult GetByClientId(int clientId)
    {
        return Ok(_dbContext.Meetings
        .Where(m => m.ClientId == clientId)
        .Include(m => m.Agent)
        .Include(m => m.LawPractice)
        .Select(m => new MeetingDTO
        {
            Id = m.Id,
            MeetingTime = m.MeetingTime,
            ConsultingOn = m.ConsultingOn,
            Agent = new AgentDTO
            {
                Id = m.Agent.Id,
                FirstName = m.Agent.FirstName,
                LastName = m.Agent.LastName
            },
            LawPractice = new LawPracticeDTO
            {
                Id = m.LawPractice.Id,
                Type = m.LawPractice.Type
            }

        }).ToList());

    }
}