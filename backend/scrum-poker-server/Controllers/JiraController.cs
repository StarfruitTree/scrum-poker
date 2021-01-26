using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using scrum_poker_server.DTOs.Incoming;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using scrum_poker_server.Models;
using scrum_poker_server.POCOs;
using System.Net;

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
            if (data.JiraDomain.Contains("http")) return StatusCode(404, new { error = "The domain is not valid" });

            bool isDomainValid = false;
            var client = _clientFactory.CreateClient();

            try
            {
                var domainResponse = await client.GetAsync($"https://{data.JiraDomain}");
                if (domainResponse.IsSuccessStatusCode) isDomainValid = true;
            }
            catch (Exception)
            {
                return StatusCode(404, new { error = "The domain is not valid" });
            }

            if (!isDomainValid) return StatusCode(404, new { error = "The domain is not valid" });

            var JiraToken = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{data.JiraEmail}:{data.APIToken}"));

            var request = new HttpRequestMessage(HttpMethod.Get, $"https://{data.JiraDomain}/rest/api/3/myself");
            request.Headers.Add("Authorization", $"Basic {JiraToken}");

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(404, new { error = "The email or API token is not valid" });
            }

            var userId = int.Parse(HttpContext.User.FindFirst("UserId").Value);
            var userRoom = await _dbContext.UserRooms.Include(ur => ur.Room).Include(ur => ur.User).FirstOrDefaultAsync(ur => ur.UserID == userId);
            userRoom.User.JiraToken = JiraToken;
            userRoom.User.JiraDomain = data.JiraDomain;
            userRoom.Room.JiraDomain = data.JiraDomain;

            await _dbContext.SaveChangesAsync();

            return StatusCode(201, new { jiraToken = JiraToken, jiraDomain = data.JiraDomain });
        }

        [HttpPost, Route("fetchstories"), Authorize(Policy = "OfficialUsers"), Consumes("application/json")]
        public async Task<IActionResult> FetchStories([FromBody] FetchJiraStories data)
        {
            if (String.IsNullOrEmpty(data.Query))
            {
                return Ok(new { status = "NotOk" });
            }

            var client = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://{data.JiraDomain}/rest/api/3/issue/picker?query={data.Query}&currentJQL");
            request.Headers.Add("Authorization", $"Basic {data.JiraToken}");

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(401);
            }

            var content = await response.Content.ReadAsStringAsync();

            return Ok(new { content, status = "Ok" });
        }

        [HttpPost, Route("addstory"), Authorize(Policy = "OfficialUsers"), Consumes("application/json")]
        public async Task<IActionResult> AddStory([FromBody] AddJiraStory data)
        {
            if (String.IsNullOrEmpty(data.IssueId))
            {
                return StatusCode(422);
            }

            var room = await _dbContext.Rooms.Include(r => r.Stories).FirstOrDefaultAsync(r => r.Id == data.RoomId);
            if (room == null)
            {
                return StatusCode(422, new { error = "The room does not exist" });
            }

            if (room.Stories.Count >= 10)
            {
                return Forbid();
            }

            var jiraStory = await _dbContext.Stories.FirstOrDefaultAsync(s => s.JiraIssueId == data.IssueId && s.RoomId == data.RoomId);
            if (jiraStory != null)
            {
                return StatusCode(422, new { error = "You've already added this story" });
            }

            var client = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://{data.JiraDomain}/rest/api/3/issue/{data.IssueId}?fields=description,summary,customfield_10026&expand=renderedFields");
            request.Headers.Add("Authorization", $"Basic {data.JiraToken}");

            var response = await client.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(404);
            }

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            var content = await response.Content.ReadAsStringAsync();

            JiraIssueResponse issue = JsonSerializer.Deserialize<JiraIssueResponse>(content, options);

            int point;

            if (issue.Fields.Customfield_10026 == null)
            {
                point = -1;
            }
            else
            {
                point = issue.Fields.Customfield_10026 > 0 ? (int)issue.Fields.Customfield_10026 : -1;
            }

            var story = new Story
            {
                Title = issue.Fields.Summary,
                Content = issue.RenderedFields.Description,
                Point = point,
                IsJiraStory = true,
                JiraIssueId = data.IssueId,
            };

            room.Stories.Add(story);
            await _dbContext.SaveChangesAsync();

            return StatusCode(201, new { storyId = story.Id, issueId = data.IssueId });
        }

        [HttpPost, Route("submitpoint"), Authorize(Policy = "OfficialUsers"), Consumes("application/json")]
        public async Task<IActionResult> SubmitPoint([FromBody] JiraSubmitPoint data)
        {
            if (data.IssueId == null || data.JiraDomain == null || data.JiraToken == null)
            {
                if (data.JiraDomain == null || data.JiraToken == null)
                {
                    return StatusCode(401);
                }

                return StatusCode(422);
            }

            var client = _clientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Put, $"https://{data.JiraDomain}/rest/api/3/issue/{data.IssueId}");
            request.Headers.Add("Authorization", $"Basic {data.JiraToken}");

            var jsonData = JsonSerializer.Serialize(new JiraSubmitPointRequest { fields = new fields { customfield_10026 = data.Point } });
            var requestBody = new StringContent(jsonData, Encoding.UTF8, "application/json");
            request.Content = requestBody;

            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                    return StatusCode(400);
                }

                return StatusCode(401);
            }

            return StatusCode(201);
        }
    }
}
