using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using scrum_poker_server.Data;
using scrum_poker_server.Utils.Jwt;
using System.Security.Claims;

namespace scrum_poker_server.Controllers
{
    [Route("api/refreshtoken")]
    [ApiController]
    public class RefreshTokenController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public JwtTokenGenerator JwtTokenGenerator { get; set; }

        public RefreshTokenController(AppDbContext dbContext, JwtTokenGenerator jwtTokenGenerator)
        {
            _dbContext = dbContext;
            JwtTokenGenerator = jwtTokenGenerator;
        }

        [Authorize(Policy = "AllUsers")]
        public IActionResult RefreshToken()
        {
            var userId = int.Parse(HttpContext.User.FindFirst("UserId").Value);
            string email = null;
            var emailClaim = HttpContext.User.FindFirst(ClaimTypes.Email);
            if (emailClaim != null) email = emailClaim.Value;
            var userName = HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            return Ok(new { jwtToken = JwtTokenGenerator.GenerateToken(new UserData { UserId = userId, Email = email, Name = userName }), expiration = email != null ? 29 : 131399, email });
        }
    }
}
