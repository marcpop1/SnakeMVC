using System;
using System.Collections.Generic;
using System.Text;
using Snake.BackEnd.Models;
using Snake.BackEnd.Dtos;

namespace Snake.BackEnd.IManagers
{
    public interface ISnakeManager
    {
        List<Models.Snake> Get();

        List<Models.Snake> SetSnakeBody();

        Game SetScore(GameDto game);

    }
}
