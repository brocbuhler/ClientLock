using ClientLock.models;
using ClientLock.Data;
using ClientLock.models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

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
    [Authorize]
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

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        Meeting meetingToDelete = _dbContext.Meetings.FirstOrDefault(m => m.Id == id);
        if (meetingToDelete == null)
        {
            return NotFound();
        }
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPatch("{id}")]
    public IActionResult Update(int id, Meeting Update)
    {
        Meeting meetingToUpdate = _dbContext.Meetings.FirstOrDefault(c => c.Id == id);
        if (meetingToUpdate == null)
        {
            return NotFound();
        }
        meetingToUpdate.MeetingTime = Update.MeetingTime;
        _dbContext.SaveChanges();
        return NoContent();
    }
}