using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs.Incoming
{
    public class JiraUserCredentials
    {
        public string JiraEmail { get; set; }

        public string JiraDomain { get; set; }

        public string APIToken { get; set; }

        public string RoomCode { get; set; }
    }
}
