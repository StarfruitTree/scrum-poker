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

namespace scrum_poker_server.Controllers
{
    [Route("api/signup")]
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
                bool isEmailExisted = _dbContext.Users.FirstOrDefault(u => u.Email == data.Email) != null;
                if (isEmailExisted) return StatusCode(409, new { error = "The email is already existed" });

                var user = new User()
                {
                    Name = data.Username
                };

                // Compute hash of the password
                var hash = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(data.Password));

                // Convert byte array to string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    builder.Append(hash[i].ToString("x2"));
                }

                var account = new User()
                {
                    Email = data.Email,
                    Password = builder.ToString(),
                    Account = new Account()
                };

                var tokenString = GenerateJWTToken(data);

                _dbContext.Users.Add(account);

                await _dbContext.SaveChangesAsync();

                return Ok(new { token = tokenString });
            }
            else return StatusCode(422);
        }

        private string GenerateJWTToken(SignUpDTO data)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddHours(3),
                Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, data.Email)
            }),
                SigningCredentials = credentials
            };

            var securityToken = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}