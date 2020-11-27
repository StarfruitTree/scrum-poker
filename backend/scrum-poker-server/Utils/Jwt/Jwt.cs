using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace scrum_poker_server.Utils.Jwt
{
    public class UserData
    {
        public string Email { get; set; }

        public int UserId { get; set; }
    }

    public class JwtTokenGenerator
    {
        public IConfiguration _configuration { get; set; }

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(UserData userData)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddMinutes(30),
                Subject = String.IsNullOrEmpty(userData.Email) ? new ClaimsIdentity(new[] { new Claim("UserId", userData.UserId.ToString()) })
                : new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, userData.Email), new Claim("UserId", userData.UserId.ToString()) }),
                SigningCredentials = credentials
            };

            var securityToken = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}