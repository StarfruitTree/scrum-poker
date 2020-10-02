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

    public int Members { get; set; }

    public List<User> Users { get; set; }

    public PokingRoom(string id, string roomName, string description, User host)
    {
      Members = 1;
      RoomId = id;
      Users = new List<User>();
      Users.Add(host);
    }

    public bool Add(User user)
    {
      var userInRoom = Users.FirstOrDefault(u => u.Name == user.Name);

      if (userInRoom != null) return false;

      Users.Add(user);
      Members++;
      return true;
    }

    public User[] GetUsers()
    {
      return Users.ToArray();
    }
  }
}