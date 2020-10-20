using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace scrum_poker_server.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(25)]
        public string Name { get; set; }

        public ICollection<UserRoom> UserRooms { get; set; }
    }
}
