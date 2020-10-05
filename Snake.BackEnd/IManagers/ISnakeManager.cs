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

        void DeleteSavedGame();

    }
}
