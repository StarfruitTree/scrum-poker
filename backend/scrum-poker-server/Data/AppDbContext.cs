using Microsoft.EntityFrameworkCore;
using scrum_poker_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace scrum_poker_server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRoom>().HasKey(userRoom => new { userRoom.UserID, userRoom.RoomId });
        }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Story> Stories { get; set; }

        public DbSet<UserRoom> UserRooms { get; set; }

        public DbSet<SubmittedPointByUser> SubmittedPointByUsers { get; set; }
    }
}
