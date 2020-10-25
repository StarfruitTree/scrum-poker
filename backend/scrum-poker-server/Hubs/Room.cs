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

        public async Task Create(string roomCode, string roomName, string description, string username, string status, int point)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

            var room = new PokingRoom(roomCode, roomName, description, new User(username, status, Role.host, point));
            var users = room.GetUsers();
            _roomService.Add(room);

            await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomName, description });
        }

        public async Task Join(string roomCode, string username, string status, int point)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

            var room = _roomService.FindRoom(roomCode);
            room.AddUser(new User(username, status, Role.player, point));

            var users = room.GetUsers();
            var stories = room.GetStories();

            var roomName = room.RoomName;
            var description = room.Description;

            await Clients.GroupExcept(roomCode, Context.ConnectionId).SendAsync("newUserConnected", new { name = username, status, point });
            await Clients.Caller.SendAsync("firstTimeJoin", new { users, roomName, description, stories });
        }

        public async Task ChangeUserStatus(string roomCode, string name, string status, int point)
        {
            var room = _roomService.FindRoom(roomCode);
            var user = room.Users.FirstOrDefault(u => u.Name == name);
            user.Status = status;
            user.Point = point;
            await Clients.Group(roomCode).SendAsync("userStatusChanged", new { name, status, point });
        }

        public async Task ChangeRoomState(string roomCode, RoomState roomState)
        {
            if (roomState == RoomState.revealed)
            {
                var room = _roomService.FindRoom(roomCode);
                room.Users.ForEach(u => u.Status = "revealed");
                var users = room.GetUsers();
                await Clients.Group(roomCode).SendAsync("usersRevealed", new { users, roomState });
            }
            else await Clients.Group(roomCode).SendAsync("roomStateChanged", new { roomState });
        }

        public async Task UpdateStories(string roomCode, int id, string title, string content)
        {
            var room = _roomService.FindRoom(roomCode);
            room.AddStory(new Story(id, title, content));
            await Clients.Group(roomCode).SendAsync("storiesUpdated", new { id, title, content });
        }

        public async Task ChangeCurrentStory(string roomCode, int id)
        {
            var room = _roomService.FindRoom(roomCode);
            room.CurrentStory = room.Stories.FirstOrDefault(s => s.Id == id);
            await Clients.Group(roomCode).SendAsync("currentStoryChanged", new { id });
        }

        public async Task Assign(string roomCode, int storyId, string username)
        {
            var room = _roomService.FindRoom(roomCode);
            var user = room.Users.FirstOrDefault(u => u.Name == username);
            var story = room.Stories.FirstOrDefault(s => s.Id == storyId);
            story.Assignee = user;

            await Clients.Group(roomCode).SendAsync("storyAssigned", new { storyId, user });
        }

        public async Task SubmitPoint(string roomCode, int storyId, int point)
        {
            var room = _roomService.FindRoom(roomCode);
            var story = room.Stories.FirstOrDefault(s => s.Id == storyId);
            story.Point = point;

            await Clients.Group(roomCode).SendAsync("pointSubmitted", new { storyId, point });
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }
      }
}
