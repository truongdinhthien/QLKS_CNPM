using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;
namespace Core.Services
{
    public class ContractService : IContractService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ContractService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

         public IEnumerable<ContractDTO> GetAll()
        {
            var contract = _unitOfWork.Contracts.GetAllInclude();
            return _mapper.Map<IEnumerable<Contract> , IEnumerable<ContractDTO> >(contract);
        }
       public IEnumerable<ContractDTO> GetBy(int id)
        {
            var contract = _unitOfWork.Contracts.GetByInclude(id);
            return _mapper.Map<IEnumerable<Contract> , IEnumerable<ContractDTO> >(contract);
        }

        public void Add(ContractDTO contractDto)
        {
            var roomId = _unitOfWork.Rooms.GetBy(contractDto.RoomId);
            roomId.Status = "Có người";
            _unitOfWork.Complete();

            var contract = _mapper.Map<ContractDTO,Contract>(contractDto);
            _unitOfWork.Contracts.Add(contract);

            _unitOfWork.Complete();
        }
    }
}