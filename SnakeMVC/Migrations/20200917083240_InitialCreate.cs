using Microsoft.EntityFrameworkCore.Migrations;

namespace SnakeMVC.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Snakes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SnakeBodyPositionX = table.Column<int>(nullable: false),
                    SnakeBodyPositionY = table.Column<int>(nullable: false),
                    ApplePositionX = table.Column<int>(nullable: false),
                    ApplePositionY = table.Column<int>(nullable: false),
                    Score = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Snakes", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Snakes");
        }
    }
}
