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

    public int[] GetStoryIds()
    {
      return StoryIds.ToArray();
    }
  }
}