namespace scrum_poker_server.DTOs
{
    public class AddStoryDTO
    {
        public int RoomId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public bool IsJiraStory { get; set; }

        public string JiraIssueId { get; set; }
    }
}
