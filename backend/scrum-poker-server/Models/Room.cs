using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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

        public string Host { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
