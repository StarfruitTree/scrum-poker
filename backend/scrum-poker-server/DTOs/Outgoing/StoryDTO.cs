using scrum_poker_server.Models;

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
    }
}
