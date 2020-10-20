using Microsoft.AspNetCore.Mvc;
using scrum_poker_server.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scrum_poker_server.Models;

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

        [HttpPost, Route("add")]
        public async Task<IActionResult> Add([FromForm] string roomCode, [FromForm] string title, [FromForm] string content )
        {
            if(ModelState.IsValid)
            {
                var room = _dbContext.Rooms.FirstOrDefault(r => r.Code == roomCode);

                if (room.Stories == null) room.Stories = new List<Story> { new Story { Title = title, Content = content } };
                else
                {
                    var story = room.Stories.FirstOrDefault(s => s.Title == title);
                    if (story != null) return StatusCode(406, new { error = "The title of the story is already existed in this room" });
                    room.Stories.Add(new Story { Title = title, Content = content });
                }
             
                await _dbContext.SaveChangesAsync();

                return StatusCode(201);
            }
            else return StatusCode(422);
        }

        [HttpPost, Route("submit")]
        public async Task<IActionResult> SubmitPoint([FromForm] string roomCode, [FromForm] string title, [FromForm] string username, [FromForm] int point)
        {
            if (ModelState.IsValid)
            {
                var story = _dbContext.Stories.FirstOrDefault(s => s.Room.Code == roomCode && s.Title == title);
                var user = _dbContext.UserRooms.FirstOrDefault(ur => ur.Room.Code == roomCode && ur.User.Name == username).User;

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
        public async Task<IActionResult> Assign([FromForm] string roomCode, [FromForm] string title, [FromForm] string username )
        {
            if (ModelState.IsValid)
            {
                var story = _dbContext.Stories.FirstOrDefault(s => s.Room.Code == roomCode && s.Title == title);
                var user = _dbContext.UserRooms.FirstOrDefault(ur => ur.Room.Code == roomCode && ur.User.Name == username).User;
                story.Assignee = user;
                await _dbContext.SaveChangesAsync();
                return StatusCode(201);
            }
            else return StatusCode(422);
        }
    }
}
