using Microsoft.EntityFrameworkCore.Migrations;

namespace scrum_poker_server.Migrations
{
    public partial class AddUserRoomToDbContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRoom_Rooms_RoomId",
                table: "UserRoom");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoom_Users_UserID",
                table: "UserRoom");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoom",
                table: "UserRoom");

            migrationBuilder.RenameTable(
                name: "UserRoom",
                newName: "UserRooms");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoom_RoomId",
                table: "UserRooms",
                newName: "IX_UserRooms_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRooms",
                table: "UserRooms",
                columns: new[] { "UserID", "RoomId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserRooms_Rooms_RoomId",
                table: "UserRooms",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRooms_Users_UserID",
                table: "UserRooms",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRooms_Rooms_RoomId",
                table: "UserRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRooms_Users_UserID",
                table: "UserRooms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRooms",
                table: "UserRooms");

            migrationBuilder.RenameTable(
                name: "UserRooms",
                newName: "UserRoom");

            migrationBuilder.RenameIndex(
                name: "IX_UserRooms_RoomId",
                table: "UserRoom",
                newName: "IX_UserRoom_RoomId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoom",
                table: "UserRoom",
                columns: new[] { "UserID", "RoomId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoom_Rooms_RoomId",
                table: "UserRoom",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoom_Users_UserID",
                table: "UserRoom",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}