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
            var members = room.Members;

      await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomId, roomName, description, members } );
    }

    public async Task Join(string roomId, string username, string status, int point)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

      var room = _roomService.FindRoom(roomId);
            room.AddUser(new User(username, status, 0));
      var users = room.GetUsers();

      var roomName = room.RoomName;
      var description = room.Description;
      var members = room.Members;

      await Clients.GroupExcept(roomId, Context.ConnectionId).SendAsync("newUserConnected", new { username, status, point, members });
      await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomId, roomName, description, members });
    }

    public async Task ChangeStatus(string roomId, string name, string status, int point)
    {
            var room = _roomService.FindRoom(roomId);
            var user = room.Users.FirstOrDefault(u => u.Name == name);
            user.Status = status;
            user.Point = point;
            await Clients.Group(roomId).SendAsync("userStatusChanged", new { name, status, point });
    } 

    public async Task RemoveFromGroup(string groupName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
    }
  }
}
