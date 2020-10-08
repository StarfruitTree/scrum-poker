using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.Models;

namespace scrum_poker_server.Controllers
{
  [Route("api/rooms")]
  [ApiController]
  public class RoomController : ControllerBase
  {
    public AppDbContext _dbContext { get; set; }

    public RoomController(AppDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpPost, Route("create")]
    public async Task<IActionResult> Create([FromForm] string host, [FromForm] string description, [FromForm] string roomName)
    {
      if (ModelState.IsValid)
      {
        var random = new Random();
        bool isRoomExisted = true;
        string randomResult, prefix, roomCode = "";

        while (isRoomExisted)
        {
          randomResult = random.Next(0, 999999).ToString();

          prefix = new string('0', 6 - randomResult.Length);

          roomCode = prefix + randomResult;

          var room = _dbContext.Rooms.FirstOrDefault(r => r.Code == roomCode);

          if (room == null) isRoomExisted = false;
        }

        _dbContext.Rooms.Add(new Room
        {
          Code = roomCode,
          Host = host,
          Description = description,
          Name = roomName,
          Users = new Collection<User> { new User { Name = host } }
        });

        await _dbContext.SaveChangesAsync();

        return StatusCode(201, new { code = roomCode, channel = $"room-{roomCode}" });
      }
      else return StatusCode(422);
    }

    [HttpPost, Route("join")]
    public async Task<IActionResult> Join([FromForm] string userName, [FromForm] string roomCode)
    {
      if (ModelState.IsValid)
      {
        var room = _dbContext.Rooms.Include(r => r.Users).FirstOrDefault(r => r.Code == roomCode);

        if (room == null) return StatusCode(404);

        var user = _dbContext.Users.FirstOrDefault(u => u.Name == userName && u.RoomId == room.Id);

        if (user != null) return StatusCode(422, new { result = "The username is already existed in this room" });

        room.Users.Add(new User { Name = userName });

        await _dbContext.SaveChangesAsync();

        return Ok(new { code = roomCode });
      }
      else return StatusCode(422);
    }
  }
}
