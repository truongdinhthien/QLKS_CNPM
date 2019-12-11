using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using System.Collections.Generic;
namespace Core.Services.Interfaces
{
    public interface IBillService
    {
        void Add(BillDTO billDto);
        IEnumerable<BillDTO> GetAll();
        IEnumerable<BillDTO> GetBy(int id);
    }
}