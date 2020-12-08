using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using scrum_poker_server.Models;

namespace scrum_poker_server.Utils.RoomUtils
{
    public class RoomCodeGenerator
    {
        public AppDbContext _dbContext { get; set; }

        public RoomCodeGenerator(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Generate()
        {
            var random = new Random();
            Room room = null;

            bool isRoomExisted = true;
            string randomResult, prefix, roomCode = "";

            while (isRoomExisted)
            {
                randomResult = random.Next(0, 999999).ToString();

                prefix = new string('0', 6 - randomResult.Length);

                roomCode = prefix + randomResult;

                room = await _dbContext.Rooms.FirstOrDefaultAsync(r => r.Code == roomCode);

                if (room == null) isRoomExisted = false;
            }

            return roomCode;
        }
    }
}
