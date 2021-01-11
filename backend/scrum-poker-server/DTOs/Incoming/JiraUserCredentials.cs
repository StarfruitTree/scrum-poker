using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs.Incoming
{
    public class JiraUserCredentials
    {
        public string Email { get; set; }

        public string Domain { get; set; }

        public string APIToken { get; set; }
    }
}
