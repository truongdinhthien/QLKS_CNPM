using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services;
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using WebAPI.Models;
using Core.Services.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypeController : ControllerBase
    {
        //Khởi tạo Unit Of Work
        private readonly IRoomTypeService _roomTypeService;
        public RoomTypeController(IRoomTypeService roomTypeService)
        {
            _roomTypeService = roomTypeService;
        }

        // GET: api/roomtype // Lấy toàn bộ danh sách loại phòng
        [HttpGet]
        public ActionResult GetRoomTypes()
        {
            var roomTypes = _roomTypeService.GetAll();
            var totalCount = roomTypes.Count<RoomTypeDTO>();

            return Ok(new { success = true, data = roomTypes, totalCount = totalCount });
        }

        // GET: api/roomtype/:id // Lấy toàn bộ danh sách loại phòng theo id
        [HttpGet("{id}")]
        public ActionResult GetRoomType(int id)
        {
            var roomType = _roomTypeService.GetBy(id);
            if (roomType == null) return NotFound(new { success = false, message = "Không tìm thấy" });
            return Ok(new { success = true, data = roomType, });
        }
        [HttpPost]
        public ActionResult PostRoomType(RoomTypeDTO roomType)
        {
            string value = roomType.NameRoomType;
            string valuePrice = roomType.PriceRoom.ToString();
            var list = _roomTypeService.GetAll();
            // //Check Validate
            // if (value == "")
            // return NotFound (new { success = false, message = "Vui lòng nhập tên loại phòng" });

            // if (valuePrice == "")
            // return NotFound (new { success = false, message = "Vui lòng nhập giá tiền" });
            // else if (!int.TryParse(valuePrice, out int n))
            // return NotFound (new { success = false, message = "Giá tiền không được chứa chữ" });

            foreach (var rt in list)
            {
                string temp = rt.NameRoomType;
                if (temp.Equals(value, StringComparison.InvariantCultureIgnoreCase))
                return NotFound (new { success = false, message = "Tên loại phòng đã tồn tại" });
            }

            _roomTypeService.Add(roomType);

            return Ok(new { success = true, message = "Thêm thành công" });
        }

        // PUT: api/roomtype/:id
        [HttpPut ("{id}")]
        public ActionResult PutRoomType(int id, RoomTypeDTO values) {
          string value = values.NameRoomType;
            var list = _roomTypeService.GetAll();
            foreach (var rt in list)
            {
                if(rt.RoomTypeId != id)
                {
                    string temp = rt.NameRoomType;
                    if (temp.Equals(value, StringComparison.InvariantCultureIgnoreCase))
                    return NotFound (new { success = false, message = "Tên loại phòng đã tồn tại" });
                }
            }
          _roomTypeService.Update(id,values);
          var roomType = _roomTypeService.GetBy(id);

          return Ok (new { success = true, data = roomType });
        }
    }
}