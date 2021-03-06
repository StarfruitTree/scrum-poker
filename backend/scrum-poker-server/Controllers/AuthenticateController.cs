﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.Utils.Jwt;
using System.Net.Http;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [Route("api/authenticate")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        public JwtTokenGenerator JwtTokenGenerator { get; set; }

        private readonly IHttpClientFactory _clientFactory;

        public AuthenticateController(AppDbContext dbContext, JwtTokenGenerator jwtTokenGenerator, IHttpClientFactory clientFactory)
        {
            _dbContext = dbContext;
            JwtTokenGenerator = jwtTokenGenerator;
            _clientFactory = clientFactory;
        }

        [Authorize(Policy = "AllUsers")]
        public async Task<IActionResult> Authenticate()
        {
            var userId = int.Parse(HttpContext.User.FindFirst("UserId").Value);
            var userRoom = await _dbContext.UserRooms.Include(ur => ur.Room).Include(ur => ur.User).FirstOrDefaultAsync(ur => ur.UserID == userId);

            var jiraToken = userRoom.User.JiraToken;
            var jiraDomain = userRoom.User.JiraDomain;

            if (jiraToken != null && jiraDomain != null)
            {
                var client = _clientFactory.CreateClient();

                var request = new HttpRequestMessage(HttpMethod.Get, $"https://{jiraDomain}/rest/api/3/myself");
                request.Headers.Add("Authorization", $"Basic {jiraToken}");

                var response = await client.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    userRoom.User.JiraToken = null;
                    userRoom.Room.JiraDomain = null;
                    await _dbContext.SaveChangesAsync();
                }
            }

            return Ok(new
            {
                name = userRoom.User.Name,
                userId = userRoom.UserID,
                userRoomCode = userRoom.Room.Code,
                email = userRoom.User.Email,
                jiraToken = userRoom.User.JiraToken,
                jiraDomain = userRoom.User.JiraDomain,
            }); ;
        }
    }
}
