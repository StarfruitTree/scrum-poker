using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        public SigningCredentials Credentials { get; set; }

        public JwtSecurityTokenHandler JwtTokenHandler { get; set; }

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            Credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtTokenHandler = new JwtSecurityTokenHandler();
        }

        public string GenerateToken(UserData userData)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddMinutes(30),
                Subject = String.IsNullOrEmpty(userData.Email) ? new ClaimsIdentity(new[] { new Claim("UserId", userData.UserId.ToString()) })
                : new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, userData.Email), new Claim("UserId", userData.UserId.ToString()) }),
                SigningCredentials = Credentials,
            };

            var securityToken = JwtTokenHandler.CreateToken(tokenDescriptor);

            return JwtTokenHandler.WriteToken(securityToken);
        }
    }
}
