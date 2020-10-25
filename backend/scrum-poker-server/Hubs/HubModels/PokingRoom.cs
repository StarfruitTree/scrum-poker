using scrum_poker_server.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.HubModels
{
    public class PokingRoom
    {
        public string RoomId { get; set; }

        public string RoomName { get; set; }

        public string Description { get; set; }

        public Story CurrentStory { get; set; }

        public RoomState State { get; set; }

        public List<User> Users { get; set; }

        public List<Story> Stories { get; set; }

        public PokingRoom(string id, string roomName, string description, User host)
        {
            RoomId = id;
            RoomName = roomName;
            Description = description;
            Users = new List<User>();
            Stories = new List<Story>();
            Users.Add(host);
        }

        public void AddUser(User user)
        {
            Users.Add(user);
        }

        public void AddStory(Story story)
        {
            Stories.Add(story);
        }

        public User[] GetUsers()
        {
            return Users.ToArray();
        }

        public Story[] GetStories()
        {
            return Stories.ToArray();
        }
    }
}