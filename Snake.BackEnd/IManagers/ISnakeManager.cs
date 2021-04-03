using System;
using System.Collections.Generic;
using System.Text;
using Snake.BackEnd.Models;
using Snake.BackEnd.Dtos;

namespace Snake.BackEnd.IManagers
{
    public interface ISnakeManager
    {

        void SaveGame(SaveGameDto saveGame);
        SaveGameDto LoadGame();
        GameDto LoadGameGame();
        AppleDto LoadGameApple();
        List<SnakeDto> LoadGameSnake();
        void DeleteSavedGame();

    }
}
