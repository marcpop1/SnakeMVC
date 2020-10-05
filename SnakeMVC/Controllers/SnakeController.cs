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
        public IActionResult LoadGame()
        {


            return View("Play");
        }

        public void DeleteSavedGame()
        {
            _snakeManager.DeleteSavedGame();
        }

    }
}
