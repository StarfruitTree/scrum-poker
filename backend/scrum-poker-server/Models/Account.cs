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

        [Column(TypeName = "varchar(255)")]
        public string Email { get; set; }

        public string Password { get; set; }

        public User User { get; set; }

        public ICollection<Room> Rooms { get; set; }
    }
}