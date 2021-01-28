using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs.Incoming
{
    public class AddJiraStory
    {
        public string IssueId { get; set; }

        public string JiraToken { get; set; }

        public string JiraDomain { get; set; }

        public int RoomId { get; set; }
    }
}
