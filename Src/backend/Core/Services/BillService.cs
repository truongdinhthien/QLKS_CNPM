using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;
using System;

namespace Core.Services
{
    public class BillService : IBillService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BillService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<BillDTO> GetAll()
        {
            var bills = _unitOfWork.Bills.GetAllInclude();
            return _mapper.Map<IEnumerable<Bill> , IEnumerable<BillDTO> >(bills);
        }
       public IEnumerable<BillDTO> GetBy(int id)
        {
            var bill = _unitOfWork.Bills.GetByInclude(id);
            if(bill == null) return null;
            return _mapper.Map<IEnumerable<Bill> , IEnumerable<BillDTO> >(bill);
        }
        public void Add(BillDTO billDto)
        {
             var contract = _unitOfWork.Contracts.GetByInclude(billDto.ContractId).FirstOrDefault();
            
            DateTime start = contract.DateIn;
            DateTime end = contract.DateOut;
            TimeSpan difference = end - start;
            int time = difference.Days * 24 + difference.Hours;
            //Tính tiền thuê phòng
            var roomId = contract.RoomId;
            var room = _unitOfWork.Rooms.GetByInclude(roomId).FirstOrDefault();
            int pricerentroom = time * room.RoomType.PriceRoom;
            //Tính chi tiết tiền thuê dịch vụ
            var contractDetail = _unitOfWork.ContractDetails.GetByInclude(billDto.ContractId);   
            int priceservice = 0;
           
            if (contractDetail == null)
            {
                priceservice = 0;
            }
            else
            {
                foreach (var item in contractDetail)
                {
                    priceservice += item.RoomService.PriceService * item.Amount;
                }
            }
            //Thay đổi thuộc tính phòng
            var roomsave = _unitOfWork.Rooms.GetBy(roomId);
            roomsave.Status = "Trống";
            //Add Bill vào database 
            billDto.PriceRentRoom = pricerentroom;
            billDto.PriceTotalService = priceservice;
            billDto.TotalPrice = pricerentroom + priceservice;
            var bill = _mapper.Map<BillDTO,Bill>(billDto);

            _unitOfWork.Bills.Add(bill);
            _unitOfWork.Complete();
        }
    }
}