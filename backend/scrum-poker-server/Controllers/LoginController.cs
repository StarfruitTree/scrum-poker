using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs.Incoming;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public IConfiguration _configuration { get; set; }

        public LoginController(AppDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDTO data)
        {
            if (ModelState.IsValid)
            {
                var hash = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(data.Password));

                // Convert byte array to string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    builder.Append(hash[i].ToString("x2"));
                }

                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == data.Email && u.Password == builder.ToString());
                if (user == null) return Unauthorized();

                return Ok(new { token = GenerateJWTToken(data) });
            }
            else return StatusCode(422);
        }

        private string GenerateJWTToken(LoginDTO data)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddMinutes(30),
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, data.Email) }),
                SigningCredentials = credentials
            };

            var securityToken = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}