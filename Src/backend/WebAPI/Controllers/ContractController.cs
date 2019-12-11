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
    public class ContractController : ControllerBase
    {
        private readonly IContractService _contractService;
        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }
        [HttpGet]
        public ActionResult GetContract()
        {
            var contracts = _contractService.GetAll();
            var totalCount = contracts.Count<ContractDTO>();
            return Ok(new { success = true, data = contracts, totalCount = totalCount });
        }
        [HttpGet("{id}")]
        public ActionResult GetContract(int id)
        {
            var contracts = _contractService.GetBy(id);
            if (contracts == null) return NotFound(new { success = false, message = "Không tìm thấy" });
            return Ok(new { success = true, data = contracts, });
        }

        [HttpPost]
        public ActionResult PostContract (ContractDTO contractDto)
        {
            _contractService.Add(contractDto);
            return Ok(new { success = true, message = "Tạo phiếu thuê phòng thành công"});
        }
    }
}