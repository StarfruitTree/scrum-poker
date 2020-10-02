using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using scrum_poker_server.HubModels;

namespace scrum_poker_server.HubServices
{
  public class RoomService
  {
    public List<PokingRoom> Rooms { get; set; }

    public RoomService()
    {
      Rooms = new List<PokingRoom>();
    }

    public void Add(PokingRoom newRoom)
    {
      Rooms.Add(newRoom);
    }

    public PokingRoom FindRoom(string roomId)
    {
      var room = Rooms.FirstOrDefault(r => r.RoomId == roomId);
      if (room != null) return room;
      return null;
    }
  }
}
