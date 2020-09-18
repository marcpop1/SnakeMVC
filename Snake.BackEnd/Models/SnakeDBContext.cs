using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Snake.BackEnd.Models;

namespace Snake.BackEnd
{
    public class SnakeDBContext : DbContext
    {
        public SnakeDBContext(DbContextOptions<SnakeDBContext> options)
            : base(options)
        {
        }

        public DbSet<Models.Snake> Snake { get; set; }
        public DbSet<Apple> Apple { get; set; }
        public DbSet<Game> Game { get; set; }

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
