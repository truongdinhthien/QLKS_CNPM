using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services;
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using Core.Services.Interfaces;
using Core.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private string regex = "^P[0-9]{3}$";
        //Khởi tạo Unit Of Work
        private readonly IRoomService _roomService;
        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }


        // GET: api/room // Lấy toàn bộ danh sách  phòng
        [HttpGet]
        public ActionResult GetRooms()
        {
            var rooms = _roomService.GetAllInclude();
            var totalCount = rooms.Count<RoomDTO>();
            return Ok(new { success = true, data = rooms, totalCount = totalCount });
        }



        // GET: api/room/id // Lấy toàn bộ danh sách phòng theo id
        [HttpGet("{id}")]
        public ActionResult GetRoom(string id)
        {
            var room = _roomService.GetBy(id);
            if (room == null) return NotFound(new { success = false, message = "Không tìm thấy" });
            return Ok(new { success = true, data = room });
        }

        [HttpPost]
        public ActionResult PostRoom(RoomDTO room)
        {
            var temp = _roomService.GetBy(room.RoomId);

            if (temp != null)
                return BadRequest(new { success = false, message = "Mã phòng đã tồn tại" });

            if (!Regex.IsMatch(room.RoomId, regex))
                return BadRequest(new { success = false, message = "Mã phòng không hợp lệ. Mã hợp lệ bắt đầu bằng P và kết thúc bằng ba số. Ví dụ : P101,P202" });

            // if (room.RoomId == "")
            // return BadRequest (new {success = false, message = "Vui lòng nhập mã phòng"});

            _roomService.Add(room);
            //roomService.Update(room);

            return Ok(new { success = true, message = "Thêm thành công" });
        }

        [HttpPut("{id}")]
        public ActionResult PutRoom(string id, RoomDTO values)
        {
            _roomService.Update(id,values);
            var room = _roomService.GetBy(id);

            return Ok(new { success = true, data = room });
        }
        [Route("/api/rentroom")]
        [HttpGet()]
        public ActionResult GetStatusRooms()
        {
            var rooms = _roomService.GetAllInclude();
            List<RentRoom> checkStatuses = _roomService.PostNew();
            if(checkStatuses==null) return BadRequest();
            
            var totalCount = rooms.Count<RoomDTO>();
            return Ok(new { success = true, data = checkStatuses, totalCount = totalCount });
        }
    }
}