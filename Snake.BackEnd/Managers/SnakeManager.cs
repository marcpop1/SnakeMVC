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

            db.Game.Add(_game);

            db.SaveChanges();

            return _game;
        } 

        public Apple SetApple(AppleDto apple)
        {

            var _apple = new Apple();

            _apple.ApplePositionX = apple.ApplePositionX;

            _apple.ApplePositionY = apple.ApplePositionY;

            db.Apple.Add(_apple);

            db.SaveChanges();

            return _apple;
        }

        public Models.Snake SetSnake(SnakeDto snake)
        {

            var _snake = new Models.Snake();

            _snake.SnakeBodyPositionX = snake.SnakeBodyPositionX;

            _snake.SnakeBodyPositionY = snake.SnakeBodyPositionY;

            db.Snake.Add(_snake);

            db.SaveChanges();

            return _snake;
        }

    }
}
