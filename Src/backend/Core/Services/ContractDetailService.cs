using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
namespace Core.Services
{
    public class ContractDetailService : IContractDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ContractDetailService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<ContractDetailDTO> GetAll()
        {
            var contractDetails = _unitOfWork.ContractDetails.GetAllInclude();
            return _mapper.Map<IEnumerable<ContractDetail> , IEnumerable<ContractDetailDTO> >(contractDetails);
        }
       public IEnumerable<ContractDetailDTO> GetBy(int id)
        {
            var contractDetail = _unitOfWork.ContractDetails.GetByInclude(id);
            if(contractDetail == null) return null;
            return _mapper.Map<IEnumerable<ContractDetail> , IEnumerable<ContractDetailDTO> >(contractDetail);
        }

        public void Add(ContractDetailDTO contractDetailDto)
        {
            var contractDetail = _mapper.Map<ContractDetailDTO,ContractDetail>(contractDetailDto);
            _unitOfWork.ContractDetails.Add(contractDetail);

            _unitOfWork.Complete();
        }
    }
}