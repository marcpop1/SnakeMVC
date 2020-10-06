using System;
using System.Collections.Generic;
using System.Text;
using Snake.BackEnd.IManagers;
using Snake.BackEnd.Models;
using Snake.BackEnd.Dtos;
using System.Linq;
using System.Threading.Tasks.Sources;

namespace Snake.BackEnd.Managers
{
    public class SnakeManager : ISnakeManager
    {

        private readonly SnakeDBContext db;

        public SnakeManager(SnakeDBContext context)
        {
            db = context;
        }

        private void SetGame(GameDto game)
        {

            var _game = new Game();

            _game.Score = game.Score;

            _game.SnakeLength = game.SnakeLength;

            db.Game.Add(_game);

            db.SaveChanges();

        } 

        private void SetApple(AppleDto apple)
        {

            var _apple = new Apple();

            _apple.ApplePositionX = apple.ApplePositionX;

            _apple.ApplePositionY = apple.ApplePositionY;

            db.Apple.Add(_apple);

            db.SaveChanges();

        }

        private void SetSnake(SnakeDto snake)
        {

            var _snake = new Models.Snake();

            _snake.SnakeBodyPositionX = snake.SnakeBodyPositionX;

            _snake.SnakeBodyPositionY = snake.SnakeBodyPositionY;

            db.Snake.Add(_snake);

            db.SaveChanges();

        }

        public void SaveGame(SaveGameDto saveGame)
        {

            GameDto _game = saveGame.Game;

            SetGame(_game);

            AppleDto _apple = saveGame.Apple;

            SetApple(_apple);

            List<SnakeDto> _snake = saveGame.Snake;

            for (int i = 0; i < saveGame.Game.SnakeLength; i++)
            {
                SetSnake(_snake[i]);
            }

        }

        public SaveGameDto LoadGame()
        {

            var _game = db.Game.First();

            GameDto _gameDto = new GameDto(_game.Score, _game.SnakeLength);

            var _apple = db.Apple.First();

            AppleDto _appleDto = new AppleDto(_apple.ApplePositionX, _apple.ApplePositionY);

            List<SnakeDto> _snakeDto = new List<SnakeDto>();

            var _snake = db.Snake.ToList();

            for (int i = 0; i < _game.SnakeLength; i++)
            {
                SnakeDto _snakeBody = new SnakeDto(_snake[i].SnakeBodyPositionX, _snake[i].SnakeBodyPositionY);

                _snakeDto.Add(_snakeBody);

            }

            SaveGameDto _savedGame = new SaveGameDto(_gameDto, _appleDto, _snakeDto);

            return _savedGame; 
        }

        public void DeleteSavedGame()
        {

            db.Game.RemoveRange(db.Game);

            db.Apple.RemoveRange(db.Apple);

            db.Snake.RemoveRange(db.Snake);

            db.SaveChanges();

        }

    }
}
