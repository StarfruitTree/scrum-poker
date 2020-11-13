using scrum_poker_server.Models;

namespace scrum_poker_server.DTOs
{
    public class StoryDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int? Point { get; set; }

        public User Assignee { get; set; }
    }
}