using System.Collections.Generic;

namespace scrum_poker_server.HubModels
{
    public class PokingRoom
    {
        public string RoomCode { get; set; }

        public int CurrentStoryId { get; set; }

        public int CurrentStoryPoint { get; set; }

        public Dictionary<int, int> PointsFrequency { get; set; }

        public string State { get; set; }

        public List<User> Users { get; set; }

        public List<int> StoryIds { get; set; }

        public PokingRoom(string roomCode, User host, string roomState)
        {
            RoomCode = roomCode;
            State = roomState;
            CurrentStoryPoint = -1;
            Users = new List<User>();
            StoryIds = new List<int>();
            PointsFrequency = new Dictionary<int, int>();
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

        public void RemoveStory(int storyId)
        {
            StoryIds.Remove(storyId);
        }

        public void RemoveUser(int id)
        {
            var user = Users.Find(u => u.Id == id);
            Users.RemoveAt(Users.IndexOf(user));
        }

        public User[] GetUsers()
        {
            return Users.ToArray();
        }
    }
}
