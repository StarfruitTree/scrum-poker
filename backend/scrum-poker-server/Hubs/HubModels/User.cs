using scrum_poker_server.Utils;

namespace scrum_poker_server.HubModels
{
    public class User
    {
        public string Name { get; set; }

        public string Status { get; set; }

        public int Point { get; set; }

        public Role Role { get; set; }

        public User(string name, string status, Role role, int point = 0)
        {
            Name = name;
            Status = status;
            Point = point;
            Role = role;
        }
    }
}
