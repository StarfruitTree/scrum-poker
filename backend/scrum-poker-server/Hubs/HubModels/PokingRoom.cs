using System.Collections.Generic;

namespace scrum_poker_server.HubModels
{
    public class PokingRoom
    {
        public string RoomId { get; set; }
        public int CurrentStoryId { get; set; }

        public string State { get; set; }

        public List<User> Users { get; set; }

        public List<int> StoryIds { get; set; }

        public PokingRoom(string id, User host, string roomState)
        {
            RoomId = id;
            State = roomState;
            Users = new List<User>();
            StoryIds = new List<int>();
            Users.Add(host);
        }

        public void AddUser(User user)
        {
            Users.Add(user);
        }

        public void AddStory(int storyId)
        {
            StoryIds.Add(storyId);
        }

        public User[] GetUsers()
        {
            return Users.ToArray();
        }
    }
}