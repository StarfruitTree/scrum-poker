using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs;
using scrum_poker_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        [Authorize(Policy = "OfficialUser")]
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

                    room = await _dbContext.Rooms.FirstOrDefaultAsync(r => r.Code == roomCode);

                    if (room == null) isRoomExisted = false;
                }

                var user = _dbContext.Users.Include(u => u.Account).ThenInclude(a => a.Rooms).FirstOrDefault(u => u.Email == HttpContext.User.FindFirst(ClaimTypes.Email).Value);

                room = new Room
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
                });

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { code = roomCode, roomId = room.Id });
            }
            else return StatusCode(422);
        }

        [Authorize(Policy = "AllUser")]
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

        [Authorize(Policy = "AllUser")]
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

                if (userRoom != null) return StatusCode(409, new { error = "You've already joined this room" });

                await _dbContext.UserRooms.AddAsync(new UserRoom
                {
                    User = await _dbContext.Users.FirstAsync(u => u.Id.ToString() == userId),
                    Room = room,
                });

                await _dbContext.SaveChangesAsync();

                return Ok(new { roomId = room.Id, code = data.RoomCode, roomName = room.Name, description = room.Description });
            }
            else return StatusCode(422);
        }
    }
}