﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Dtos
{
    public class SnakeDto
    {

        public SnakeDto(int snakeBodyPositonX, int snakeBodyPositonY)
        {
            SnakeBodyPositionX = snakeBodyPositonX;
            SnakeBodyPositionY = snakeBodyPositonY;
        }

        public int ID { get; set; }
        public int SnakeBodyPositionX { get; set; }
        public int SnakeBodyPositionY { get; set; }

    }
}
