using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Dtos
{
    public class SaveGameDto
    {

        public SaveGameDto(GameDto game, AppleDto apple, List<SnakeDto> snake)
        {
            Game = game;
            Apple = apple;
            Snake = snake;
        }

        public GameDto Game { get; set; }
        public AppleDto Apple { get; set; }
        public List<SnakeDto> Snake { get; set; }

    }
}
