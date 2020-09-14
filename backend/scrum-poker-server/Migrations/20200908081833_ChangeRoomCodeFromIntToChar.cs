using Microsoft.EntityFrameworkCore.Migrations;

namespace scrum_poker_server.Migrations
{
    public partial class ChangeRoomCodeFromIntToChar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Rooms",
                type: "char(6)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "char(6)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Rooms",
                type: "char(6)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "char(6)",
                oldNullable: true);
        }
    }
}
