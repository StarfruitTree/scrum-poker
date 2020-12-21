using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs;
using scrum_poker_server.Models;
using scrum_poker_server.Utils;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [ApiController]
    [Route("api/stories")]
    public class StoryController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public StoryController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Authorize(Policy = "AllUsers")]
        [HttpGet, Route("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (ModelState.IsValid)
            {
                var story = await _dbContext.Stories.FirstOrDefaultAsync(s => s.Id == id);
                if (story == null)
                {
                    return StatusCode(404, new { error = "The story is not existed" });
                }
                return Ok(new { id, title = story.Title, content = story.Content, point = story.Point });
            }
            else return StatusCode(422);
        }

        [Authorize(Policy = "OfficialUsers")]
        [Consumes("application/json")]
        [HttpPost, Route("add")]
        public async Task<IActionResult> Add([FromBody] AddStoryDTO data)
        {
            if (ModelState.IsValid)
            {
                var room = _dbContext.Rooms.Include(r => r.Stories).FirstOrDefault(r => r.Id == data.RoomId);
                if (room == null)
                {
                    return StatusCode(422, new { error = "The room code is not existed" });
                }

                var userId = Int32.Parse(HttpContext.User.FindFirst("UserId").Value);
                var userRoom = await _dbContext.UserRooms.FirstOrDefaultAsync(ur => ur.UserID == userId && ur.RoomId == data.RoomId);

                if (userRoom == null) return Forbid();
                else if (userRoom.Role != Role.host) return Forbid();

                var story = new Story { Title = data.Title, Content = data.Content, Point = -1 };

                room.Stories.Add(story);

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { id = story.Id });
            }
            else return StatusCode(422);
        }

        [Authorize(Policy = "AllUsers")]
        [Consumes("application/json")]
        [HttpPost, Route("submitpoint")]
        public async Task<IActionResult> SubmitPoint([FromBody] SubmitPointDTO data)
        {
            if (ModelState.IsValid)
            {
                var story = await _dbContext.Stories.Include(s => s.SubmittedPointByUsers).FirstOrDefaultAsync(s => s.Id == data.StoryId);
                if (story == null) return NotFound();

                var userId = Int32.Parse(HttpContext.User.FindFirst("UserId").Value);
                var userRoom = await _dbContext.UserRooms.Include(ur => ur.User).
                    FirstOrDefaultAsync(ur => ur.RoomId == story.RoomId && ur.UserID == userId);

                if (userRoom == null) return Forbid();

                if (data.IsFinalPoint)
                {
                    if (userRoom.Role != Role.host) return Forbid();
                    story.Point = data.Point;
                }
                else
                {
                    var submittedPoint = story.SubmittedPointByUsers.FirstOrDefault(i => i.UserId == userId);
                    if (submittedPoint != null) _dbContext.Remove(submittedPoint);

                    story.SubmittedPointByUsers.Add(new SubmittedPointByUser
                    {
                        Point = data.Point,
                        User = userRoom.User
                    });
                }

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { storyId = data.StoryId });
            }
            else return StatusCode(422);
        }

        [Authorize(Policy = "OfficialUsers")]
        [Consumes("application/json")]
        [HttpPost, Route("assign")]
        public async Task<IActionResult> Assign([FromBody] AssignStoryDTO data)
        {
            if (ModelState.IsValid)
            {
                var story = await _dbContext.Stories.Include(s => s.Assignee).FirstOrDefaultAsync(s => s.Id == data.StoryId);
                if (story == null) return NotFound();

                var userId = Int32.Parse(HttpContext.User.FindFirst("UserId").Value);
                var userRoom = await _dbContext.UserRooms.Include(ur => ur.User).
                    FirstOrDefaultAsync(ur => ur.RoomId == story.RoomId && ur.UserID == userId);

                if (userRoom == null) return Forbid();
                else if (userRoom.Role != Role.host) return Forbid();

                var assignee = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == data.UserId);
                story.Assignee = assignee;

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { storyId = data.StoryId });
            }
            else return StatusCode(422);
        }
    }
}