using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Models
{
    public class Account
    {
        public int Id { get; set; }

        public User User { get; set; }

        public ICollection<Room> Rooms { get; set; }
    }
}