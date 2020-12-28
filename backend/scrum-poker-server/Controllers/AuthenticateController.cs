using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.Utils.Jwt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [Route("api/authenticate")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public JwtTokenGenerator JwtTokenGenerator { get; set; }

        public AuthenticateController(AppDbContext dbContext, JwtTokenGenerator jwtTokenGenerator)
        {
            _dbContext = dbContext;
            JwtTokenGenerator = jwtTokenGenerator;
        }

        [Authorize(Policy = "OfficialUsers")]
        public async Task<IActionResult> Authenticate()
        {
            var userId = int.Parse(HttpContext.User.FindFirst("UserId").Value);
            var userRoom = await _dbContext.UserRooms.Include(ur => ur.Room).Include(ur => ur.User).FirstOrDefaultAsync(ur => ur.UserID == userId);

            return Ok(new
            {
                jwtToken = JwtTokenGenerator.GenerateToken(new UserData { Email = userRoom.User.Email, UserId = userRoom.UserID, Name = userRoom.User.Name }),
                expiration = 1740,
                name = userRoom.User.Name,
                userId = userRoom.UserID,
                userRoomCode = userRoom.Room.Code
            });
        }
    }
}