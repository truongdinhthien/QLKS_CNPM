using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System;
using System.Text.RegularExpressions;
using Core.Services.Interfaces;
namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IEmployerService _employerService;
        public LoginController(IEmployerService employerService)
        {
            _employerService = employerService;
        }


        [HttpPost]
        public ActionResult Login (EmployerDTO employer)
        {
            var temp = _employerService.Find(employer.Username);

            if(temp==null)
            {
                return BadRequest (new {success = false, message = "Tên đăng nhập không tồn tại"});
            }

            if(!temp.Password.Equals(employer.Password))
            {
                return BadRequest (new {success = false, message = "Password sai"});
            }
            if(temp.Active == "Block")
            {
                return BadRequest (new {success = false, message = "Tài khoản đã bị khóa"});
            }
            return Ok(new {success = true, data = temp});
        }
    }
}