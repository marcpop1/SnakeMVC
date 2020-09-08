using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SnakeMVC.Controllers
{
    public class SnakeController : Controller
    {
        public IActionResult Play()
        {
            return View();
        }
    }
}
