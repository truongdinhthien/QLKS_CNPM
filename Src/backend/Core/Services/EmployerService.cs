using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;

namespace Core.Services
{
    public class EmployerService : IEmployerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public EmployerService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<EmployerDTO> GetAll()
        {
            var employers = _unitOfWork.Employers.GetAll();
            return _mapper.Map<IEnumerable<Employer>,IEnumerable<EmployerDTO>>(employers);
        }

        public EmployerDTO GetBy(int id)
        {
            var employer = _unitOfWork.Employers.GetBy(id);
            return _mapper.Map<Employer,EmployerDTO>(employer);
        }

        public bool Add(EmployerDTO employerDto)
        {
            Employer temp = _unitOfWork.Employers.Find(e => e.PhoneNumber.Equals(employerDto.PhoneNumber)).SingleOrDefault();
            if(temp != null)
                return false;

            if (employerDto.Username == null)
                employerDto.Username = employerDto.PhoneNumber;
            if(employerDto.Password == null)
                employerDto.Password = "123456";
            if(employerDto.Active == null)
                employerDto.Active = "Active";
            
            var employer = _mapper.Map<EmployerDTO,Employer>(employerDto);
            _unitOfWork.Employers.Add(employer);

            _unitOfWork.Complete();

            return true;
        }
        public void Update(int id,EmployerDTO employerDto)
        {
            var employer = _unitOfWork.Employers.GetBy(id);
            if (employer == null) return;
            employer.Password = employerDto.Password;
            //_mapper.Map<EmployerDTO, Employer>(employerDto, employer);
            _unitOfWork.Complete();
        }

        public EmployerDTO Find (string username)
        {
            var query = _unitOfWork.Employers;

            Employer temp = query.Find(emp => emp.Username.Equals(username)).FirstOrDefault();
            return _mapper.Map<Employer, EmployerDTO>(temp);
        }

        public void Block(EmployerDTO employerDto)
        {
            var employer = _unitOfWork.Employers.GetBy(employerDto.EmployerId);
            if(employer == null) return;
            if(employer.Active == "Active")
                employer.Active = "Block";
            else
                employer.Active = "Active";
            _unitOfWork.Complete();
        }
    }
}