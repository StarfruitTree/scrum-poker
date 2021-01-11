using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs.Incoming;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace scrum_poker_server.Controllers
{
    [Route("api/jira")]
    [ApiController]
    public class JiraController : ControllerBase
    {
        public AppDbContext _dbContext { get; set; }

        private readonly IHttpClientFactory _clientFactory;

        public JiraController(AppDbContext dbContext, IHttpClientFactory clientFactory)
        {
            _dbContext = dbContext;
            _clientFactory = clientFactory;
        }

        [HttpPost, Route("addtoken"), Authorize(Policy = "OfficialUsers"), Consumes("application/json")]
        public async Task<IActionResult> AddToken([FromBody] JiraUserCredentials data)
        {
            if (ModelState.IsValid)
            {
                if (data.Domain.Contains("http")) return StatusCode(404, new { error = "The domain is not valid" });

                bool isDomainValid = false;
                var client = _clientFactory.CreateClient();

                try
                {
                    var domainResponse = await client.GetAsync($"https://{data.Domain}");
                    if (domainResponse.IsSuccessStatusCode) isDomainValid = true;
                }
                catch (Exception)
                {
                    return StatusCode(404, new { error = "The domain is not valid" });
                }

                if (!isDomainValid) return StatusCode(404, new { error = "The domain is not valid" });

                var JiraToken = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{data.Email}:{data.APIToken}"));

                bool isTokenValid = false;
                var request = new HttpRequestMessage(HttpMethod.Get, $"https://{data.Domain}/rest/api/3/myself");
                request.Headers.Add("Authorization", $"Basic {JiraToken}");

                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode) isTokenValid = true;

                if (!isTokenValid) return StatusCode(404, new { error = "The email or API token is not valid" });

                var userId = int.Parse(HttpContext.User.FindFirst("UserId").Value);
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
                user.JiraToken = JiraToken;

                await _dbContext.SaveChangesAsync();

                return Ok(new { jiraToken = JiraToken });
            }
            else
            {
                return StatusCode(422);
            }
        }
    }
}
