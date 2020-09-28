using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Dtos
{
    public class GameDto
    {
        public SnakeBodyDto SnakeBody { get; set; }
        public AppleDto Apple { get; set; }
        public int Score { get; set; }
        public int SnakeLength { get; set; }

    }
}
