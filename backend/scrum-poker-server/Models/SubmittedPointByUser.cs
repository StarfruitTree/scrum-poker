using System.ComponentModel.DataAnnotations.Schema;

namespace scrum_poker_server.Models
{
    public class SubmittedPointByUser
    {
        public int Id { get; set; }

        public float Point { get; set; }

        [ForeignKey("Story")]
        public int StoryId { get; set; }

        public Story Story { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
