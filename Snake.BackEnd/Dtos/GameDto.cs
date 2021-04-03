using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Dtos
{
    public class GameDto
    {

        public GameDto(int score, int snakeLength, int snakeDirection)
        {
            Score = score;
            SnakeLength = snakeLength;
            SnakeDirection = snakeDirection;
        }

        public int ID { get; set; }
        public int Score { get; set; }
        public int SnakeLength { get; set; }
        public int SnakeDirection {get;set;}

    }
}
