using System;
using System.Collections.Generic;
using System.Text;

namespace Snake.BackEnd.Dtos
{
    public class SaveGameDto
    {

        public GameDto Game { get; set; }
        public AppleDto Apple { get; set; }
        public List<SnakeDto> Snake { get; set; }

    }
}
