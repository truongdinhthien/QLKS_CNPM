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
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/customer // Lấy toàn bộ danh sách kh
        [HttpGet]
        public ActionResult GetCustomer()
        {
            var customers = _customerService.GetAll();
            var totalCount = customers.Count<CustomerDTO>();
            return Ok(new { success = true, data = customers, totalCount = totalCount });
        }

        // GET: api/customer/:id // Lấy toàn bộ danh sách phòng theo cmnd
        [HttpGet("{id}")]
        public ActionResult GetCustomer(string id)
        {
            var customer = _customerService.GetBy(id);
            if(customer==null) return BadRequest(new{success=false, message = "Không tìm thấy"});
            return Ok(new { success = true, data = customer });
        }
        [HttpPost]
        public ActionResult PostCustomer(CustomerDTO customerDto)
        {
            if(!_customerService.Add(customerDto))
                return BadRequest(new { success = false, message = "Số CMND đã tồn tại" });
            var customer = _customerService.GetBy(customerDto.CMND);
            return Ok(new { success = true, data = customer,message = "Thêm thành công" });
        }

        [HttpPut("{id}")]
        public ActionResult PutCustomer(string id, CustomerDTO values)
        {
            var customer = _customerService.GetBy(id);

            string valueCMND = values.CMND;
            // string valuePhoneNumber = values.PhoneNumber;
            // string valueFullName = values.FullName;
            // string valueAddress = values.Address;
            var list = _customerService.GetAll();

            // if (valueCMND == "")
            //     return NotFound(new { success = false, message = "Vui lòng nhập chứng minh nhân dân" });

            // if (valuePhoneNumber == "")
            //     return NotFound(new { success = false, message = "Vui lòng nhập số diện thoại" });

            // if (valueFullName == "")
            //     return NotFound(new { success = false, message = "Vui lòng nhập họ và tên" });

            // if (valueAddress == "")
            //     return NotFound(new { success = false, message = "Vui lòng nhập địa chỉ" });


            foreach (var c in list)
            {
                if (!c.CustomerId.Equals(id))
                {
                    string temp = c.CMND;
                    if (temp.Equals(valueCMND))
                        return NotFound(new { success = false, message = "Số chứng minh nhân dân đã tồn tại" });
                }
            }

            _customerService.Update(values);

            return Ok(new { success = true, message = "Sửa thành công" });
        }

    }
}