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

    public async Task Create(string roomId, string roomName, string description, string username, string status, int point)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

      var room = new PokingRoom(roomId, roomName, description, new User(username, status, point));
      var users = room.GetUsers();
      _roomService.Add(room);

      await Clients.Group(roomId).SendAsync("firstTimeJoin", users );
    }

    public async Task Join(string roomId, string username, string status, int point)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

      var room = _roomService.FindRoom(roomId);
      room.AddUser(new User { 
          Name = username,
          Status = status,
          Point = point
      });
      var roomUsers = room.GetUsers();

      await Clients.Group(roomId).SendAsync("newUserConnected", new { username, status, point });
      await Clients.Caller.SendAsync("firstTimeJoin", new { room.RoomId, room.RoomName, room.Description, room.Members, roomUsers });
    }

    public async Task RemoveFromGroup(string groupName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
    }
  }
}
