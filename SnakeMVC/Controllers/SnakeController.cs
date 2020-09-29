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
        public IActionResult SaveGame([FromBody] GameDto gameInput)
        { 

            _snakeManager.SetGame(gameInput);

            return Json(new { success = true});

        }

    }
}
