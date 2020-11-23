using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs
{
    public class SubmitPointDTO
    {
        public int StoryId { get; set; }

        public int Point { get; set; }

        public bool IsFinalPoint { get; set; }
    }
}