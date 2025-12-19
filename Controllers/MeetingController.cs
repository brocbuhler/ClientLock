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
    public IActionResult Create([FromBody] MeetingCreateDTO newMeeting)
    {
        var meetingToCreate = new Meeting
        {
            MeetingTime = newMeeting.MeetingTime,
            AgentId = newMeeting.AgentId,
            ClientId = newMeeting.ClientId,
            LawPracticeId = newMeeting.LawPracticeId,
            ConsultingOn = newMeeting.ConsultingOn
        };

        _dbContext.Meetings.Add(meetingToCreate);
        _dbContext.SaveChanges();

            var createdMeeting = _dbContext.Meetings
            .Include(m => m.Agent)
            .Include(m => m.Client)
            .Include(m => m.LawPractice)
            .FirstOrDefault(m => m.Id == meetingToCreate.Id);

        return Created($"api/meeting/{meetingToCreate.Id}", meetingToCreate);
    }


    [HttpGet("client/{clientId}")]
    [Authorize]
    public IActionResult GetByClientId(int clientId)
    {
        return Ok(_dbContext.Meetings
        .Where(m => m.ClientId == clientId)
        .Include(m => m.Agent)
        .Include(m => m.Client)
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
            Client = new ClientDTO
            {
                Id = m.Client.Id,
                FirstName = m.Client.FirstName,
                LastName = m.Client.LastName
            },
            LawPractice = new LawPracticeDTO
            {
                Id = m.LawPractice.Id,
                Type = m.LawPractice.Type
            }

        }).ToList());
    }

    [HttpGet("agent/{agentId}")]
    [Authorize]
    public IActionResult GetByAgentId(int agentId)
    {
        return Ok(_dbContext.Meetings
        .Where(m => m.AgentId == agentId)
        .Include(m => m.Agent)
        .Include(m => m.Client)
        .Include(m => m.LawPractice)
        .Select(m => new MeetingDTO
        {
            Id = m.Id,
            MeetingTime = m.MeetingTime,
            ConsultingOn = m.ConsultingOn,
            Client = new ClientDTO
            {
                Id = m.Client.Id,
                FirstName = m.Client.FirstName,
                LastName = m.Client.LastName
            },
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
        _dbContext.Meetings.Remove(meetingToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPatch("{id}")]
    [Authorize]
    public IActionResult Update(int id, [FromBody] MeetingUpdateDTO update)
    {
        var meetingToUpdate = _dbContext.Meetings.FirstOrDefault(c => c.Id == id);
        if (meetingToUpdate == null) return NotFound();

        if (update.MeetingTime != null)
            meetingToUpdate.MeetingTime = update.MeetingTime;

        _dbContext.SaveChanges();
        return NoContent();
    }

}