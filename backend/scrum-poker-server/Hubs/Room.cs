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

    public async Task Create(string roomCode, string roomName, string description, string username, string status, int point)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

      var room = new PokingRoom(roomCode, roomName, description, new User(username, status, point));
      var users = room.GetUsers();
      _roomService.Add(room);
      var members = room.Members;

      await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomName, description });
    }

    public async Task Join(string roomCode, string username, string status, int point)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

      var room = _roomService.FindRoom(roomCode);
      room.AddUser(new User(username, status, 0));
      var users = room.GetUsers();

      var roomName = room.RoomName;
      var description = room.Description;
      var members = room.Members;

      await Clients.GroupExcept(roomCode, Context.ConnectionId).SendAsync("newUserConnected", new { name = username, status, point });
      await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomName, description });
    }

    public async Task ChangeStatus(string roomCode, string name, string status, int point)
    {
      var room = _roomService.FindRoom(roomCode);
      var user = room.Users.FirstOrDefault(u => u.Name == name);
      user.Status = status;
      user.Point = point;
      await Clients.Group(roomCode).SendAsync("userStatusChanged", new { name, status, point });
    }

    public async Task RemoveFromGroup(string groupName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
    }
  }
}
