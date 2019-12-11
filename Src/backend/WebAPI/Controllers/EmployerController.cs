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
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerService _employerService;
        public EmployerController(IEmployerService employerService)
        {
            _employerService = employerService;
        }

        [HttpGet]
        public ActionResult GetEmployer()
        {
            var employers = _employerService.GetAll();
            var totalCount = employers.Count<EmployerDTO>();
            return Ok(new { success = true, data = employers, totalCount = totalCount });
        }

        [HttpGet("{id}")]
        public ActionResult GetEmployer(int id)
        {
            var employer = _employerService.GetBy(id);
            if (employer == null) return NotFound(new { success = false, message = "Không tìm thấy" });
            return Ok(new { success = true, data = employer });
        }

        [HttpPost]
        public ActionResult PostEmployer(EmployerDTO employerDTO)
        {
            if (!_employerService.Add(employerDTO))
                return BadRequest(new { success = false, message = "Số điện thoại đã tồn tại" });
            return Ok(new { success = true, message = "Thêm thành công" });
        }

        [Route("/api/changeactive")]
        [HttpPost]
        public ActionResult BlockEmployer(EmployerDTO employerDTO)
        {
            _employerService.Block(employerDTO);
            return Ok(new { success = true, message = "Thao tác thành công" });
        }
    }
}