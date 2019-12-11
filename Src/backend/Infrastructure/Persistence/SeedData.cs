using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using Core.Entities;
using System.Security.Cryptography;

namespace Infrastructure.Persistence
{
    public class SeedData
    {
        
        public static void Initialize(HotelContext context)
        {
            context.Database.EnsureCreated();
            if(context.Rooms.Any()) return;

            //Thêm Loại phòng
            var roomtypes = new RoomType []
            {
                new RoomType
                {
                    NameRoomType = "Phòng Đơn",
                    PriceRoom = 80000,
                },
                new RoomType
                {
                    NameRoomType = "Phòng Đôi",
                    PriceRoom = 120000,
                }
            };
            context.RoomTypes.AddRange (roomtypes);
            context.SaveChanges();
            //Thêm phòng
            var rooms = new Room []
            {
                new Room
                {
                    RoomId = "P101",
                    Status = "Trống",
                    RoomTypeId = roomtypes.Single(rt => rt.NameRoomType == "Phòng Đơn").RoomTypeId,
                },
                new Room
                {
                    RoomId = "P102",
                    Status = "Trống",
                    RoomTypeId = roomtypes.Single(rt => rt.NameRoomType == "Phòng Đôi").RoomTypeId,
                },
                new Room
                {
                    RoomId = "P103",
                    Status = "Trống",
                    RoomTypeId = roomtypes.Single(rt => rt.NameRoomType == "Phòng Đơn").RoomTypeId,
                },
                new Room
                {
                    RoomId = "P201",
                    Status = "Trống",
                    RoomTypeId = roomtypes.Single(rt => rt.NameRoomType == "Phòng Đơn").RoomTypeId,
                },
                new Room
                {
                    RoomId = "P202",
                    Status = "Trống",
                    RoomTypeId = roomtypes.Single(rt => rt.NameRoomType == "Phòng Đôi").RoomTypeId,
                }
            };
            context.Rooms.AddRange (rooms);

            var customers = new Customer []
            {
                new Customer 
                {
                    FullName = "Trương Đình Thiện",
                    PhoneNumber = "0837060928",
                    CMND = "212345679",
                    Address = "20 Lô Đ Quang Trung, P10, Gò Vấp, TPHCM",
                    Gender = "Nam"
                },
                new Customer 
                {
                    FullName = "Nguyễn Thành Đạt",
                    PhoneNumber = "0123986792",
                    CMND = "212365479",
                    Address = "273 An Dương Vương, P5, Q.5, TPCHM",
                    Gender = "Nam"
                },
                new Customer 
                {
                    FullName = "Ngũ Đức Thuận",
                    PhoneNumber = "0839830921",
                    CMND = "123456789",
                    Address = "212 Lý Thường Kiệt, P2, Q.10, TPHCM",
                    Gender = "Nữ"
                },
                new Customer 
                {
                    FullName = "Nguyễn Ngọc Tuyết",
                    PhoneNumber = "0123706922",
                    CMND = "112354679",
                    Address = "213 Lý Thường Kiệt, P2, Q.10, TPHCM",
                    Gender = "Nữ"
                }
            };
            context.Customers.AddRange(customers);

            var roomservice = new RoomService []
            {
                new RoomService 
                {
                    NameService = "Giặt ủi",
                    PriceService = 20000
                },
                new RoomService 
                {
                    NameService = "Ăn sáng",
                    PriceService = 30000
                },
                new RoomService 
                {
                    NameService = "Ăn trưa",
                    PriceService = 30000
                },
                new RoomService 
                {
                    NameService = "Ăn tối",
                    PriceService = 40000
                },
                new RoomService 
                {
                    NameService = "Hồ bơi",
                    PriceService = 50000
                }
            };
            context.RoomServices.AddRange(roomservice);

            var employers = new Employer [] {
                new Employer {
                    FullName = "Trương Đình Thiện",
                    Address = "281 Hai Bà Trưng, P Tân Định, Q1, TPHCM",
                    PhoneNumber = "0123456789",
                    Gender = "Nam",
                    Active = "Active",
                    Username = "admin",
                    Password = "admin",
                    Role  = "ADMIN"
                },
                new Employer {
                    FullName = "Nguyễn Thành Đạt",
                    Address = "281 Hai Bà Trưng, P Tân Định, Q1, TPHCM",
                    PhoneNumber = "0889977661",
                    Gender = "Nam",
                    Active = "Active",
                    Username = "staff",
                    Password = "staff",
                    Role  = "STAFF"
                },
                new Employer {
                    FullName = "Nguyễn Văn A",
                    Address = "281 Hai Bà Trưng, P Tân Định, Q1, TPHCM",
                    PhoneNumber = "0213456789",
                    Gender = "Nữ",
                    Active = "Active",
                    Username = "staff123",
                    Password = "staff",
                    Role  = "STAFF"
                },

            };
            context.Employers.AddRange(employers);
            context.SaveChanges();
            var contracts = new Contract [] {
                new Contract {
                    RoomId = "P101",
                    DateIn = new DateTime(2019, 11, 16, 12, 10, 0),
                    DateOut = new DateTime(2019, 11, 16, 16, 10,0),
                    EmployerId = employers.Single(e => e.FullName == "Nguyễn Thành Đạt").EmployerId,
                    CustomerId = customers.Single(employers=>employers.FullName == "Nguyễn Ngọc Tuyết").CustomerId
                },
                new Contract {
                    RoomId = "P102",
                    DateIn = new DateTime(2019, 11, 17, 17, 10, 0),
                    DateOut = new DateTime(2019, 11, 17, 19, 10,0),
                    EmployerId = employers.Single(e => e.FullName == "Nguyễn Văn A").EmployerId,
                    CustomerId = customers.Single(employers=>employers.FullName == "Nguyễn Thành Đạt").CustomerId
                },
                new Contract {
                    RoomId = "P103",
                    DateIn = new DateTime(2019, 11, 18, 12, 10, 0),
                    DateOut = new DateTime(2019, 11, 18, 13, 10, 0),
                    EmployerId = employers.Single(e => e.FullName == "Nguyễn Thành Đạt").EmployerId,
                    CustomerId = customers.Single(employers=>employers.FullName == "Ngũ Đức Thuận").CustomerId
                }
            };
            context.Contracts.AddRange(contracts);
            context.SaveChanges();
            var contractdetails = new ContractDetail []
            {
                new ContractDetail {
                    ContractId = 1,
                    RoomServiceId = 2,
                    Amount = 1,
                    TimeAdded = new DateTime(2019, 11, 16, 13, 10, 0)
                },
                new ContractDetail {
                    ContractId = 1,
                    RoomServiceId = 3,
                    Amount = 2,
                    TimeAdded = new DateTime(2019, 11, 16, 15, 15, 0)
                },new ContractDetail {
                    ContractId = 2,
                    RoomServiceId = 1,
                    Amount = 1,
                    TimeAdded = new DateTime(2019, 11, 17, 15, 15, 0)
                }
            };
            context.ContractDetails.AddRange(contractdetails);
            context.SaveChanges();

            var bills = new Bill []
            {
                new Bill {
                    PriceRentRoom = 320000,
                    PriceTotalService = 90000,
                    TotalPrice = 410000,
                    ContractId = 1,
                    EmployerId = 2
                },
                new Bill {
                    PriceRentRoom = 240000,
                    PriceTotalService = 20000,
                    TotalPrice = 260000,
                    ContractId = 2,
                    EmployerId = 1
                },
                new Bill {
                    PriceRentRoom = 320000,
                    PriceTotalService = 0,
                    TotalPrice = 320000,
                    ContractId = 3,
                    EmployerId = 3
                },
            };
            context.Bills.AddRange(bills);
            context.SaveChanges();
        }
    }
}