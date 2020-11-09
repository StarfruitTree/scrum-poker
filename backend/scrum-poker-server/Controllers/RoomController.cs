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
using scrum_poker_server.Utils;

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
    public async Task<IActionResult> Create([FromBody] string userName, [FromBody] string description, [FromBody] string roomName)
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

        var host = new User { Name = userName };

        _dbContext.UserRooms.Add(new UserRoom
        {
          User = host,
          Room = new Room
          {
            Host = host,
            Code = roomCode,
            Name = roomName,
            Description = description
          },
          Role = Role.host
        });

        await _dbContext.SaveChangesAsync();

        return StatusCode(201, new { code = roomCode, description, roomName, userRole = 0 });
      }
      else return StatusCode(422);
    }

    [HttpPost, Route("join")]
    public async Task<IActionResult> Join([FromBody] string userName, [FromBody] string roomCode)
    {
      if (ModelState.IsValid)
      {
        var room = _dbContext.Rooms.FirstOrDefault(r => r.Code == roomCode);

        if (room == null) return StatusCode(404, new { error = "The room doesn't exist" });

        var userRoom = _dbContext.UserRooms.FirstOrDefault(ur => ur.Room.Code == roomCode && ur.User.Name == userName);

        if (userRoom != null) return StatusCode(409, new { error = "The username is already existed in this room" });

        _dbContext.UserRooms.Add(new UserRoom
        {
          User = new User { Name = userName },
          Room = room,
          Role = Role.player
        });

        await _dbContext.SaveChangesAsync();

        return Ok(new { code = roomCode, roomName = room.Name, description = room.Description, userRole = 1 });
      }
      else return StatusCode(422);
    }
  }
}
