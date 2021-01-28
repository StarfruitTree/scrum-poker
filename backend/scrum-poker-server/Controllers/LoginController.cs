using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs.Incoming;
using scrum_poker_server.Utils.Jwt;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public IConfiguration _configuration { get; set; }

        public JwtTokenGenerator JwtTokenGenerator { get; set; }

        public LoginController(AppDbContext dbContext, IConfiguration configuration, JwtTokenGenerator jwtTokenGenerator)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            JwtTokenGenerator = jwtTokenGenerator;
        }

        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO data)
        {
            var bytes = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(data.Password));
            string hashedPassword = BitConverter.ToString(bytes).Replace("-", "").ToLower();

            var userRoom = await _dbContext.UserRooms.Include(ur => ur.Room).Include(ur => ur.User).FirstOrDefaultAsync(ur => ur.User.Email == data.Email && ur.User.Password == hashedPassword);
            if (userRoom == null) return Unauthorized();

            return Ok(new
            {
                jwtToken = JwtTokenGenerator.GenerateToken(new UserData { Email = data.Email, UserId = userRoom.UserID, Name = userRoom.User.Name }),
                expiration = 29,
                name = userRoom.User.Name,
                userId = userRoom.UserID,
                userRoomCode = userRoom.Room.Code,
                email = data.Email,
                jiraToken = userRoom.User.JiraToken,
                jiraDomain = userRoom.User.JiraDomain,
            });
        }
    }
}
