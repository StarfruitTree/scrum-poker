using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs
{
    public class AddStoryDTO
    {
        public string RoomCode { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}