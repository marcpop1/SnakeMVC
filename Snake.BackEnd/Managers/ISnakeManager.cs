using System;
using System.Collections.Generic;
using System.Text;
using Snake.BackEnd.Models;

namespace Snake.BackEnd.Managers
{
    public interface ISnakeManager
    {
        List<Models.Snake> Get();

        List<Models.Snake> SetSnakeBody();

    }
}
