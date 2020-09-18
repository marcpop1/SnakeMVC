using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Managers
{
    public class SnakeManager : ISnakeManager
    {

        private readonly SnakeDBContext _context;

        public SnakeManager(SnakeDBContext context)
        {
            _context = context;
        }

        public List<Models.Snake> Get()
        {
            throw new NotImplementedException();
        }

        public List<Models.Snake> Set()
        {
            throw new NotImplementedException();
        }
    }
}
