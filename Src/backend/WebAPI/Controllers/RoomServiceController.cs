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
    public class RoomServiceController : ControllerBase
    {

        //Khởi tạo Unit Of Work
        private readonly IServiceRoomService _serviceRoomService;
        public RoomServiceController(IServiceRoomService serviceRoomService)
        {
            _serviceRoomService = serviceRoomService;
        }

        // GET: api/roomservice // Lấy toàn bộ danh sách  phòng
        [HttpGet]
        public ActionResult GetRoomService()
        {
            var servicerooms = _serviceRoomService.GetAll();
            var totalCount = servicerooms.Count<RoomServiceDTO>();
            return Ok(new { success = true, data = servicerooms, totalCount = totalCount });
        }

        // GET: api/roomservice/:id // Lấy toàn bộ danh sách phòng theo id
        [HttpGet("{id}")]
        public ActionResult GetRoomService(int id)
        {
            var serviceroom = _serviceRoomService.GetBy(id);
            if (serviceroom == null) return NotFound(new { success = false, message = "Không tìm thấy" });
            return Ok(new { success = true, data = serviceroom });
        }

        [HttpPost]
        public ActionResult PostRoomService(RoomServiceDTO roomService)
        {
            string value = roomService.NameService;
            string valuePrice  = roomService.PriceService.ToString();
            var list = _serviceRoomService.GetAll();

            //Check Validate
            // if (value == "")
            // return NotFound (new { success = false, message = "Vui lòng nhập tên dịch vụ" });

            // if (valuePrice == "")
            // return NotFound (new { success = false, message = "Vui lòng nhập giá tiền" });
            // else if (!int.TryParse(valuePrice, out int n))
            // return NotFound (new { success = false, message = "Giá tiền không được chứa chữ" });

            foreach (var rs in list)
            {
                string temp = rs.NameService;
                if (temp.Equals(value, StringComparison.InvariantCultureIgnoreCase))
                    return NotFound(new { success = false, message = "Tên dịch vụ đã tồn tại" });
            }
            _serviceRoomService.Add(roomService);

            return Ok(new { success = true, message = "Thêm thành công" });
        }

        [HttpPut("{id}")]
        public ActionResult PutRoomService(int id, RoomServiceDTO values)
        {
            var roomService= _serviceRoomService.GetBy(id);
            string value = values.NameService;
            var list = _serviceRoomService.GetAll();
            foreach (var rs in list)
            {
                if (rs.RoomServiceId != id)
                {
                    string temp = rs.NameService;
                    if (temp.Equals(value, StringComparison.InvariantCultureIgnoreCase))
                        return NotFound(new { success = false, message = "Tên dịch vụ đã tồn tại" });
                }

            }
            _serviceRoomService.Update(id,values);
            roomService = _serviceRoomService.GetBy(id);

            return Ok(new { success = true, data = roomService });
        }
    }
}