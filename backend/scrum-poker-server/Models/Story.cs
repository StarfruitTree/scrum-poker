using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace scrum_poker_server.Models
{
    public class Story
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Title { get; set; }

        public string Content { get; set; }

        public int? Point { get; set; }

        [ForeignKey("Room")]
        public int RoomId { get; set; }

        public Room Room { get; set; }

        [ForeignKey("Assignee")]
        public int? UserId { get; set; }

        public User Assignee { get; set; }

        public ICollection<SubmittedPointByUser> SubmittedPointByUsers { get; set; }
    }   
}
