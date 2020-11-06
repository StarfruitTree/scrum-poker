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

    public int CurrentStoryId { get; set; }

    public string State { get; set; }

    public List<User> Users { get; set; }

    public List<int> StoryIds { get; set; }

    public PokingRoom(string id, string roomName, string description, User host, string roomState)
    {
      RoomId = id;
      RoomName = roomName;
      State = roomState;
      Description = description;
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