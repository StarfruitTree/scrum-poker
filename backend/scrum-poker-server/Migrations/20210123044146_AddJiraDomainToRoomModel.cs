using Microsoft.EntityFrameworkCore.Migrations;

namespace scrum_poker_server.Migrations
{
    public partial class AddJiraDomainToRoomModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "JiraDomain",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JiraDomain",
                table: "Rooms");
        }
    }
}
