using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using Core.Services.Interfaces;
using Core.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBillService _billService;
        public BillController(IUnitOfWork unitOfWork,IBillService billService)
        {
            _unitOfWork = unitOfWork;
            _billService = billService;
            
        }
        [HttpGet]
        // api/nhanvien?name=&{name}&age=
        // [HttpGet]
        // pub lic ActionResult SearchBill([FromQuery] Nhanvien nv)
        // { obj.

        // }
        public ActionResult GetBill()
        {
            var bills = _billService.GetAll();
            var totalCount = bills.Count<BillDTO>();
            return Ok(new { success = true, data = bills, totalCount = totalCount });
        }
        [HttpGet("{id}")]
        public ActionResult GetBill(int id)
        {
            var bill = _billService.GetBy(id);
            if (bill == null) return NotFound(new { success = false, message = "Không tìm thấy" });
            return Ok(new { success = true, data = bill });
        }
        [HttpPost]
        public ActionResult PostBill(BillDTO billDto)
        {
            _billService.Add(billDto);
            //var bill = _billService.GetBy(billDto.BillId);

            return Ok(new { success = true, message = "Tạo hóa đơn thành công"});
        }
    }
}