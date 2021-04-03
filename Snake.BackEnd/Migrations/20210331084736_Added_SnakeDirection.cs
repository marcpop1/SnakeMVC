using Microsoft.EntityFrameworkCore.Migrations;

namespace Snake.BackEnd.Migrations
{
    public partial class Added_SnakeDirection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SnakeDirection",
                table: "Game",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SnakeDirection",
                table: "Game");
        }
    }
}
