using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs;
using scrum_poker_server.Models;
using scrum_poker_server.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [Consumes("application/json")]
        [HttpPost, Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateRoomDTO data)
        {
            if (ModelState.IsValid)
            {
                var random = new Random();
                Room room = null;
                bool isRoomExisted = true;
                string randomResult, prefix, roomCode = "";

                while (isRoomExisted)
                {
                    randomResult = random.Next(0, 999999).ToString();

                    prefix = new string('0', 6 - randomResult.Length);

                    roomCode = prefix + randomResult;

                    room = _dbContext.Rooms.FirstOrDefault(r => r.Code == roomCode);

                    if (room == null) isRoomExisted = false;
                }

                var host = new User { Name = data.UserName };
                room = new Room
                {
                    Host = host,
                    Code = roomCode,
                    Name = data.RoomName,
                    Description = data.Description
                };

                _dbContext.UserRooms.Add(new UserRoom
                {
                    User = host,
                    Room = room,
                    Role = Role.host
                });

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { code = roomCode, roomId = room.Id });
            }
            else return StatusCode(422);
        }

        [HttpGet, Route("{id}/stories")]
        public IActionResult GetStories(int id)
        {
            if (ModelState.IsValid)
            {
                var room = _dbContext.Rooms.Include(r => r.Stories).FirstOrDefault(r => r.Id == id);
                if (room == null) return NotFound(new { error = "The room doesn't exist" });
                var stories = new List<StoryDTO>();
                room.Stories.ToList().ForEach(s =>
                {
                    stories.Add(new StoryDTO { Id = s.Id, Title = s.Title, Content = s.Content, Assignee = s.Assignee, Point = s.Point });
                });

                return Ok(new { stories = stories.ToArray() });
            }
            else return StatusCode(422);
        }

        [Consumes("application/json")]
        [HttpPost, Route("join")]
        public async Task<IActionResult> Join([FromBody] JoinRoomDTO data)
        {
            if (ModelState.IsValid)
            {
                var room = _dbContext.Rooms.FirstOrDefault(r => r.Code == data.RoomCode);

                if (room == null) return NotFound(new { error = "The room is not existed" });

                var userRoom = _dbContext.UserRooms.FirstOrDefault(ur => ur.Room.Code == data.RoomCode && ur.User.Name == data.UserName);

                if (userRoom != null) return StatusCode(409, new { error = "The userName is already existed in this room" });

                _dbContext.UserRooms.Add(new UserRoom
                {
                    User = new User { Name = data.UserName },
                    Room = room,
                    Role = Role.player
                });

                await _dbContext.SaveChangesAsync();

                return Ok(new { roomId = room.Id, code = data.RoomCode, roomName = room.Name, description = room.Description });
            }
            else return StatusCode(422);
        }
    }
}