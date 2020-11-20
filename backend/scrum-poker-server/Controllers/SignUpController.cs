using Microsoft.AspNetCore.Mvc;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs.Incoming;
using scrum_poker_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace scrum_poker_server.Controllers
{
    [Route("api/signup")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public IConfiguration _configuration { get; set; }

        public SignUpController(AppDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [Consumes("application/json")]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpDTO data)
        {
            if (ModelState.IsValid)
            {
                bool isEmailExisted = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == data.Email) != null;
                if (isEmailExisted) return StatusCode(409, new { error = "The email is already existed" });

                // Compute hash of the password
                var bytes = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(data.Password));
                string hashedPassword = BitConverter.ToString(bytes).Replace("-", "").ToLower();

                var user = new User()
                {
                    Email = data.Email,
                    Password = hashedPassword,
                    Name = data.Username,
                    Account = new Account()
                };

                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();

                return Ok(new { token = GenerateJWTToken(data, user.Id) });
            }
            else return StatusCode(422);
        }

        private string GenerateJWTToken(SignUpDTO data, int userId)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddHours(3),
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, data.Email), new Claim("UserId", userId.ToString()) }),
                SigningCredentials = credentials
            };

            var securityToken = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}