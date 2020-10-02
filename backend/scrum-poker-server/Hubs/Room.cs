using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scrum_poker_server.HubServices;
using scrum_poker_server.HubModels;


namespace scrum_poker_server.Hubs
{
  public class Room : Hub
  {
    public RoomService _roomService { get; set; }
    public Room(RoomService roomService)
    {
      _roomService = roomService;
    }

    public Task SendMessage(string user, string message, string groupName)
    {
      return Clients.Group(groupName).SendAsync("Send", user, message);
    }

    public async Task AddToRoom(string roomId, string roomName, string description, User host)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

      var room = new PokingRoom(roomId, roomName, description, host);
      var roomUsers = room.GetUsers();
      _roomService.Add(room);

      await Clients.Group(roomId).SendAsync("Send", new { room.RoomId, room.RoomName, room.Description, room.Members, roomUsers });
    }

    public async Task RemoveFromGroup(string groupName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
    }
  }
}
