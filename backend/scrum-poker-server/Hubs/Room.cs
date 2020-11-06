using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scrum_poker_server.HubServices;
using scrum_poker_server.HubModels;
using scrum_poker_server.Utils;

namespace scrum_poker_server.Hubs
{
  public class Room : Hub
  {
    public RoomService _roomService { get; set; }

    public Room(RoomService roomService)
    {
      _roomService = roomService;
    }

    public async Task Create(string roomCode, string roomName, string description, string username, string status, int point, string roomState)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

      var room = new PokingRoom(roomCode, roomName, description, new User(username, status, Role.host, point), roomState);
      var users = room.GetUsers();
      _roomService.Add(room);

      await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomState });
    }

    public async Task Join(string roomCode, string username, string status, int point, int role)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

      var room = _roomService.FindRoom(roomCode);
      room.AddUser(new User(username, status, (Role)role, point));

      var users = room.GetUsers();
      var storyIds = room.StoryIds;

      var roomName = room.RoomName;
      var description = room.Description;
      var roomState = room.State;

      await Clients.GroupExcept(roomCode, Context.ConnectionId).SendAsync("newUserConnected", new { name = username, status, point });
      await Clients.Caller.SendAsync("firstTimeJoin", new { users, storyIds, roomState });
    }

    public async Task ChangeUserStatus(string roomCode, string name, string status, int point)
    {
      var room = _roomService.FindRoom(roomCode);
      var user = room.Users.FirstOrDefault(u => u.Name == name);
      user.Status = status;
      user.Point = point;
      await Clients.Group(roomCode).SendAsync("userStatusChanged", new { name, status, point });
    }

    public async Task ChangeRoomState(string roomCode, string roomState)
    {
      var room = _roomService.FindRoom(roomCode);
      room.State = roomState;

      if (roomState == "revealed")
      {
        room.Users.ForEach(u => u.Status = "revealed");
        var users = room.GetUsers();
        await Clients.Group(roomCode).SendAsync("roomStateChanged", new { users, roomState });
      }
      else await Clients.Group(roomCode).SendAsync("roomStateChanged", new { roomState });
    }

    public async Task AddStories(string roomCode, int id)
    {
      var room = _roomService.FindRoom(roomCode);
      room.AddStory(id);
      await Clients.Group(roomCode).SendAsync("storiesUpdated", new { id });
    }

    public async Task UpdateStories(string roomCode, int id)
    {
      await Clients.Group(roomCode).SendAsync("storiesUpdated", new { id });
    }

    public async Task ChangeCurrentStory(string roomCode, int id)
    {
      var room = _roomService.FindRoom(roomCode);
      room.CurrentStoryId = room.StoryIds.Find(storyId => storyId == id);
      await Clients.Group(roomCode).SendAsync("currentStoryChanged", new { id });
    }

    public async Task RemoveFromGroup(string groupName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

      await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
    }
  }
}
