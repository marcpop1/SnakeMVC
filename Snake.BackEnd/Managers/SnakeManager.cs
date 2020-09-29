using System;
using System.Collections.Generic;
using System.Text;
using Snake.BackEnd.IManagers;
using Snake.BackEnd.Models;
using Snake.BackEnd.Dtos;

namespace Snake.BackEnd.Managers
{
    public class SnakeManager : ISnakeManager
    {

        private readonly SnakeDBContext db;

        public SnakeManager(SnakeDBContext context)
        {
            db = context;
        }

        public List<Models.Snake> Get()
        {
            throw new NotImplementedException();
        }

        public List<Models.Snake> SetSnakeBody()
        {
            throw new NotImplementedException();
        }

        public Game SetGame(GameDto game)
        {

            var _game = new Game();

            _game.Score = game.Score;

            _game.SnakeLength = game.SnakeLength;

            _game.Apple.ApplePositionX = game.Apple.ApplePositionX;

            _game.Apple.ApplePositionY = game.Apple.ApplePositionY;

            db.Game.Add(_game);

            db.SaveChanges();

            return _game;
        } 
    }
}
