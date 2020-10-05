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

        void SetGame(GameDto game);

        void SetApple(AppleDto apple);

        void SetSnake(SnakeDto snake);

        void SaveGame(SaveGameDto saveGame);

    }
}
