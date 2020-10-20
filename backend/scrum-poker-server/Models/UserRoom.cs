using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Models
{
    public enum Role
    {
        Host,
        Player
    }

    public class UserRoom
    {
        [ForeignKey("User")]
        public int UserID { get; set; }

        public User User { get; set; }

        [ForeignKey("Room")]
        public int RoomId { get; set; }

        public Room Room { get; set; }

        public Role Role { get; set; }
    }
}
