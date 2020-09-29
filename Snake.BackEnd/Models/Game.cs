using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Models
{
    public class Game
    {
        public int ID { get; set; }
        public int Score { get; set; }
        public int SnakeLength { get; set; }

        public Apple Apple { get; set; }
    }
}
