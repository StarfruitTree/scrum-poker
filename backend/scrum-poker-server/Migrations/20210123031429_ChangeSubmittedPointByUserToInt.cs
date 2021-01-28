using Microsoft.EntityFrameworkCore.Migrations;

namespace scrum_poker_server.Migrations
{
    public partial class ChangeSubmittedPointByUserToInt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Point",
                table: "SubmittedPointByUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Point",
                table: "SubmittedPointByUsers",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
