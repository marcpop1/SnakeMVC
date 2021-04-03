using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Dtos
{
    public class AppleDto
    {

        public AppleDto(int applePositioxX, int applePositioxY)
        {
            ApplePositionX = applePositioxX;
            ApplePositionY = applePositioxY;
        }

        public int ApplePositionX { get; set; }
        public int ApplePositionY { get; set; }
    }
}
