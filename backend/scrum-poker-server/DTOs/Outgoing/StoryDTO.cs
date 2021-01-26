using scrum_poker_server.Models;
using System.Collections.Generic;

namespace scrum_poker_server.DTOs
{
    public class StoryDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public float Point { get; set; }

        public User Assignee { get; set; }

        public bool IsJiraStory { get; set; }

        public string JiraIssueId { get; set; }

        public List<SubmittedPointByUser> SubmittedPointByUsers { get; set; }
    }

    public class SubmittedPointByUser
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public int Point { get; set; }
    }
}
