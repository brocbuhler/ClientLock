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
}