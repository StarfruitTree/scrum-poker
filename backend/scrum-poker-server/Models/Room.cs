using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace scrum_poker_server.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Column(TypeName = "char(6)")]
        public string Code { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        [ForeignKey("Host")]
        public int HostId { get; set; }

        public User Host { get; set; }

        public ICollection<UserRoom> UserRooms { get; set; }

        public ICollection<Story> Stories { get; set; }
    }
}
