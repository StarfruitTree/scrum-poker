using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.DTOs
{
    public class JoinRoomDTO
    {
        public string UserName { get; set; }

        public string RoomCode { get; set; }
    }
}