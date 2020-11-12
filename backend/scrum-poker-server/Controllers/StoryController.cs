using Microsoft.AspNetCore.Mvc;
using scrum_poker_server.Data;
using scrum_poker_server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [Route("api/stories")]
    public class StoryController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public StoryController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet, Route("get/{id}")]
        public IActionResult Get(int id)
        {
            if (ModelState.IsValid)
            {
                var story = _dbContext.Stories.FirstOrDefault(s => s.Id == id);
                if (story == null)
                {
                    return StatusCode(404, new { error = "The story is not existed" });
                }
                return Ok(new { id, title = story.Title, content = story.Content });
            }
            else return StatusCode(422);
        }

        [HttpPost, Route("add")]
        public async Task<IActionResult> Add([FromForm] string roomCode, [FromForm] string title, [FromForm] string content)
        {
            if (ModelState.IsValid)
            {
                var room = _dbContext.Rooms.FirstOrDefault(r => r.Code == roomCode);
                if (room == null)
                {
                    return StatusCode(422, new { error = "The room code is not existed" });
                }

                var story = new Story { Title = title, Content = content };

                if (room.Stories == null)
                {
                    room.Stories = new List<Story> { story };
                }
                else
                {
                    room.Stories.Add(story);
                }

                await _dbContext.SaveChangesAsync();

                return StatusCode(201, new { id = story.Id });
            }
            else return StatusCode(422);
        }

        [HttpPost, Route("submit")]
        public async Task<IActionResult> SubmitPoint([FromForm] string roomCode, [FromForm] int id, [FromForm] string userName, [FromForm] int point)
        {
            if (ModelState.IsValid)
            {
                var story = _dbContext.Stories.FirstOrDefault(s => s.Room.Code == roomCode && s.Id == id);
                var user = _dbContext.UserRooms.FirstOrDefault(ur => ur.Room.Code == roomCode && ur.User.Name == userName).User;

                story.SubmittedPointByUsers.Add(new SubmittedPointByUser
                {
                    Point = point,
                    User = user
                });

                await _dbContext.SaveChangesAsync();
                return StatusCode(201);
            }
            else return StatusCode(422);
        }

        [HttpPost, Route("assign")]
        public async Task<IActionResult> Assign([FromForm] string roomCode, [FromForm] int id, [FromForm] string userName)
        {
            if (ModelState.IsValid)
            {
                var story = _dbContext.Stories.FirstOrDefault(s => s.Room.Code == roomCode && s.Id == id);
                var user = _dbContext.UserRooms.FirstOrDefault(ur => ur.Room.Code == roomCode && ur.User.Name == userName).User;
                story.Assignee = user;
                await _dbContext.SaveChangesAsync();
                return StatusCode(201, new { storyId = id, userName });
            }
            else return StatusCode(422);
        }
    }
}