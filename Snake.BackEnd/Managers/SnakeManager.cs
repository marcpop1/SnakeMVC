using System;
using System.Collections.Generic;
using System.Text;
using Snake.BackEnd.IManagers;

namespace Snake.BackEnd.Managers
{
    public class SnakeManager : ISnakeManager
    {

        private readonly SnakeDBContext db;

        public SnakeManager(SnakeDBContext context)
        {
            db = context;
        }

        public List<Models.Snake> Get()
        {
            throw new NotImplementedException();
        }

        public List<Models.Snake> SetSnakeBody()
        {
            throw new NotImplementedException();
        }
    }
}
