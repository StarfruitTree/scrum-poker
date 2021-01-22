using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs.Incoming;
using scrum_poker_server.Utils.Jwt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [Route("api/changename")]
    [ApiController]
    public class ChangeNameController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public JwtTokenGenerator JwtTokenGenerator { get; set; }

        public ChangeNameController(AppDbContext dbContext, JwtTokenGenerator jwtTokenGenerator)
        {
            _dbContext = dbContext;
            JwtTokenGenerator = jwtTokenGenerator;
        }

        [Authorize(Policy = "AllUsers")]
        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> ChangeName([FromBody] ChangeNameDTO data)
        {
            var userId = int.Parse(HttpContext.User.FindFirst("UserId").Value);
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            user.Name = data.NewName;

            string email = null;
            var emailClaim = HttpContext.User.FindFirst(ClaimTypes.Email);
            if (emailClaim != null) email = emailClaim.Value;
            await _dbContext.SaveChangesAsync();

            return StatusCode(201, new { jwtToken = JwtTokenGenerator.GenerateToken(new UserData { UserId = userId, Email = email, Name = data.NewName }), name = data.NewName, userId = userId, expiration = email != null ? 29 : 131399, email });
        }
    }
}
