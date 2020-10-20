using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Models
{
    public class SubmittedPointByUser
    {
        public int Id { get; set; }

        public int Point { get; set; }

        [ForeignKey("Story")]
        public int StoryId { get; set; }

        public Story Story { get; set; }
        
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
