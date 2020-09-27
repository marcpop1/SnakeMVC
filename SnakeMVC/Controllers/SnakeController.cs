using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Snake.BackEnd.Dtos;
using Snake.BackEnd.IManagers;


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

        [HttpGet]
        public IActionResult SaveGame(GameDto gameInput)
        {
            return View("Play");
        }

    }
}
