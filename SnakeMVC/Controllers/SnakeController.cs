using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Snake.BackEnd.Dtos;
using Snake.BackEnd.IManagers;
using Snake.BackEnd.Models;

namespace SnakeMVC.Controllers
{
    public class SnakeController : Controller
    {
        public IActionResult Play()
        {
            return View();
        }

        private ISnakeManager _snakeManager;

        public SnakeController(ISnakeManager snakeManager)
        {
            _snakeManager = snakeManager;
        }

        [Route("Snake/SaveGame")]
        [HttpPost]
        public IActionResult SaveGame(string gameInput)
        {

            SaveGameDto _gameInput = Newtonsoft.Json.JsonConvert.DeserializeObject<SaveGameDto>(gameInput);

            _snakeManager.SaveGame(_gameInput);

            return Json(new { success = true });

        }

        [HttpGet]
        public JsonResult LoadGame()
        {
            var savedGame = _snakeManager.LoadGame();

            return Json(savedGame);
        }

        [HttpGet]
        public JsonResult LoadGameGame()
        {
            var savedGame = _snakeManager.LoadGameGame();

            return Json(savedGame);
        }

        [HttpGet]
        public JsonResult LoadGameApple()
        {
            var savedApple = _snakeManager.LoadGameApple();

            return Json(savedApple);
        }

        [HttpGet]
        public JsonResult LoadGameSnake()
        {
            var savedSnake = _snakeManager.LoadGameSnake();

            return Json(savedSnake);
        }
        public void DeleteSavedGame()
        {
            _snakeManager.DeleteSavedGame();
        }

    }
}
