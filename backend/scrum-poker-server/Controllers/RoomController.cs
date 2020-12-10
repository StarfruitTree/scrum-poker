using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs;
using scrum_poker_server.Models;
using scrum_poker_server.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using scrum_poker_server.Utils.RoomUtils;

namespace scrum_poker_server.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public RoomController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize(Policy = "OfficialUsers")]
        [Consumes("application/json")]
        [HttpPost, Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateRoomDTO data)
        {
            if (ModelState.IsValid)
            {
                var roomCode = await new RoomCodeGenerator(_dbContext).Generate();

                var user = _dbContext.Users.Include(u => u.Account).ThenInclude(a => a.Rooms).FirstOrDefault(u => u.Email == HttpContext.User.FindFirst(ClaimTypes.Email).Value);

                var room = new Room
                {
                    Owner = user,
                    Code = roomCode,
                    Name = data.RoomName,
                    Description = data.Description
                };

                user.Account.Rooms.Add(room);

                await _dbContext.UserRooms.AddAsync(new UserRoom
                {
                    User = user,
                    Room = room,
                    Role = Role.host
                });

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { code = roomCode, roomId = room.Id });
            }
            else return StatusCode(422);
        }

        [Authorize(Policy = "AllUsers")]
        [HttpGet, Route("{id}/stories")]
        public async Task<IActionResult> GetStories(int id)
        {
            if (ModelState.IsValid)
            {
                var room = await _dbContext.Rooms.Include(r => r.Stories).FirstOrDefaultAsync(r => r.Id == id);
                if (room == null) return NotFound(new { error = "The room doesn't exist" });

                var userRoom = await _dbContext.UserRooms.
                    FirstOrDefaultAsync(ur => ur.RoomId == room.Id && ur.UserID.ToString() == HttpContext.User.FindFirst("UserId").Value);

                if (userRoom == null) return Forbid();

                var stories = new List<StoryDTO>();
                room.Stories.ToList().ForEach(s =>
                {
                    stories.Add(new StoryDTO { Id = s.Id, Title = s.Title, Content = s.Content, Assignee = s.Assignee, Point = s.Point });
                });

                return Ok(new { stories });
            }
            else return StatusCode(422);
        }

        [Authorize(Policy = "AllUsers")]
        [Consumes("application/json")]
        [HttpPost, Route("join")]
        public async Task<IActionResult> Join([FromBody] JoinRoomDTO data)
        {
            if (ModelState.IsValid)
            {
                var room = await _dbContext.Rooms.FirstOrDefaultAsync(r => r.Code == data.RoomCode);
                if (room == null) return NotFound(new { error = "The room doesn't exist" });

                var userId = HttpContext.User.FindFirst("UserId").Value;

                var userRoom = await _dbContext.UserRooms.FirstOrDefaultAsync(ur => ur.Room.Code == data.RoomCode && ur.User.Id.ToString() == userId);

                if (userRoom != null) return Ok(new { roomId = room.Id, roomCode = data.RoomCode, roomName = room.Name, description = room.Description, role = userRoom.Role });

                await _dbContext.UserRooms.AddAsync(new UserRoom
                {
                    User = await _dbContext.Users.FirstAsync(u => u.Id.ToString() == userId),
                    Room = room,
                    Role = Role.player
                });

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { roomId = room.Id, roomCode = data.RoomCode, roomName = room.Name, description = room.Description, role = Role.player });
            }
            else return StatusCode(422);
        }
    }
}
