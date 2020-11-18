using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs
{
    public class CreateRoomDTO
    {
        public string UserName { get; set; }

        public string Description { get; set; }

        public string RoomName { get; set; }
    }
}