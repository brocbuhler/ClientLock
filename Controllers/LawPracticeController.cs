using ClientLock.models;
using ClientLock.Data;
using ClientLock.models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ClientLock.Controllers;

[ApiController]
[Route("api/[controller]")]

public class LawController : ControllerBase
{
    private ClientLockDbContext _dbContext;

    public LawController(ClientLockDbContext context)
    {
        _dbContext = context;
    }

  [HttpGet]
  [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.LawPractices.Select(c => new LawPracticeDTO {Type = c.Type, Id = c.Id, Description = c.Description}).ToList());
    }
  [HttpGet("practice/{lawpracticeid}")]
  [Authorize]
  public IActionResult GetAgentByLaw( int lawpracticeid)
    {
        return Ok(_dbContext.AgentLawPractices
        .Where(lp => lp.LawPracticeId == lawpracticeid)
        .Include(lp => lp.Agent)
        .Select(lp => new AgentLawPracticeDTO
        {
            Id = lp.Id,
            LawPracticeId = lp.LawPracticeId,
            AgentId = lp.AgentId,
            Agent = new AgentDTO
            {
                Id = lp.Agent.Id,
                FirstName = lp.Agent.FirstName,
                LastName = lp.Agent.LastName,
                UserProfileId = lp.Agent.UserProfileId,
                Phone = lp.Agent.Phone,
                Email = lp.Agent.Email,
                Image = lp.Agent.Image
            }
        }).ToList());
    }

    [HttpGet("agent/{agentId}")]
    [Authorize]
  public IActionResult GetLawByAgent( int agentId)
    {
        return Ok(_dbContext.AgentLawPractices
        .Where(lp => lp.AgentId == agentId)
        .Include(lp => lp.LawPractice)
        .Select(lp => new AgentLawPracticeDTO
        {
            Id = lp.Id,
            LawPracticeId = lp.LawPracticeId,
            LawPractice = new LawPracticeDTO
            {
                Id = lp.LawPractice.Id,
                Type = lp.LawPractice.Type
            },
            AgentId = lp.AgentId,
        }).ToList());
    }
}