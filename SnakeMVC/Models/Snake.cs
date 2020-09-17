using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SnakeMVC.Models
{
    public class Snake
    {
        public int ID { get; set; }
        public int SnakeBodyPositionX { get; set; }
        public int SnakeBodyPositionY { get; set; }
        public int ApplePositionX { get; set; }
        public int ApplePositionY { get; set; }
        public int Score { get; set; }

    }

    public class SnakeDBContext : DbContext
    {
        public SnakeDBContext(DbContextOptions<SnakeDBContext> options)
            : base(options)
        {
        }
        public DbSet<Snake> Snakes { get; set; }
    }

    public class SnakeDBContextFactory : IDesignTimeDbContextFactory<SnakeDBContext>
    {
        public SnakeDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SnakeDBContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=SnakeDBContext;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new SnakeDBContext(optionsBuilder.Options);
        }
    }

}
