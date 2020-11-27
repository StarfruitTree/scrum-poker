using scrum_poker_server.HubModels;
using System.Collections.Generic;
using System.Linq;

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
