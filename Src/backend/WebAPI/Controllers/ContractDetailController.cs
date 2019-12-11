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
    public class ContractDetailController : ControllerBase
    {
         private readonly IContractDetailService _contractDetailService;
        public ContractDetailController(IContractDetailService contractDetailService)
        {
            _contractDetailService = contractDetailService;
        }

        [HttpGet]
        public ActionResult GetContractDetail()
        {
            var contractdetails = _contractDetailService.GetAll();
            var totalCount = contractdetails.Count<ContractDetailDTO>();
            return Ok(new { success = true, data = contractdetails, totalCount = totalCount });
        }
        [HttpGet("{id}")]
        public ActionResult GetContractDetail(int id)
        {
            var contractdetails = _contractDetailService.GetBy(id);
            if (contractdetails == null) return BadRequest(new { success = false, message = "Phòng chưa thuê dịch vụ" });
            return Ok(new { success = true, data = contractdetails });
        }

        [HttpPost]
        public ActionResult PostContractDetail (ContractDetailDTO contractDetail)
        {
            _contractDetailService.Add(contractDetail);
            return Ok(new { success = true, message = "Thêm thành công"});
        }
    }
}