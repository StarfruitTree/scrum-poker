using System.Collections.Generic;

namespace scrum_poker_server.Models
{
    public class Account
    {
        public int Id { get; set; }

        public User User { get; set; }

        public ICollection<Room> Rooms { get; set; }
    }
}
