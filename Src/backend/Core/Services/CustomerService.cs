using Core.DTOs;
using Core.Interfaces;
using Core.Entities;
using Core.Services.Interfaces;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;

namespace Core.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CustomerService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

         public IEnumerable<CustomerDTO> GetAll()
        {
            var customer = _unitOfWork.Customers.GetAll();
            return _mapper.Map<IEnumerable<Customer> , IEnumerable<CustomerDTO> >(customer);
        }

        public CustomerDTO GetBy(string id)
        {
            var query = _unitOfWork.Customers;
            Customer temp = query.Find(cus => cus.CMND.Equals(id)).SingleOrDefault();
             if(temp==null)
            {
                return null;
            }
            else{
                // var customer = _unitOfWork.Customers.GetBy(id);
                return _mapper.Map<Customer , CustomerDTO >(temp);
            }
            
        }
        public bool Add(CustomerDTO customerDto)
        {

             var query = _unitOfWork.Customers;
            Customer temp = query.Find(cus => cus.CMND.Equals(customerDto.CMND)).SingleOrDefault();
            if(temp != null)
                return false;
            
            var customer = _mapper.Map<CustomerDTO,Customer>(customerDto);
            _unitOfWork.Customers.Add(customer);

            _unitOfWork.Complete();

            return true;
        }
        public void Update(CustomerDTO customerDto)
        {
            var customer = _unitOfWork.Customers.GetBy(customerDto.CustomerId);
            if (customer == null) return;

            _mapper.Map<CustomerDTO,Customer>(customerDto, customer);
            _unitOfWork.Complete();
        }
    }
}