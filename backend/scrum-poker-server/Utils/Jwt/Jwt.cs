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

        public string Name { get; set; }
    }

    public class JwtTokenGenerator
    {
        private IConfiguration _configuration { get; set; }

        private SigningCredentials Credentials { get; set; }

        private JwtSecurityTokenHandler JwtTokenHandler { get; set; }

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            Credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtTokenHandler = new JwtSecurityTokenHandler();
        }

        public string GenerateToken(UserData userData)
        {
            var claims = new ClaimsIdentity(new[] { new Claim("UserId", userData.UserId.ToString()), new Claim(ClaimTypes.Name, userData.Name) });
            bool isEmailNull = String.IsNullOrEmpty(userData.Email);
            if (!isEmailNull)
            {
                claims.AddClaim(new Claim(ClaimTypes.Email, userData.Email));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = isEmailNull ? DateTime.Now.AddMonths(3) : DateTime.Now.AddMinutes(30),
                Subject = claims,
                SigningCredentials = Credentials,
            };

            var securityToken = JwtTokenHandler.CreateToken(tokenDescriptor);

            return JwtTokenHandler.WriteToken(securityToken);
        }
    }
}
