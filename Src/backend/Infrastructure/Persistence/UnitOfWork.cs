using Core.Interfaces;
using Infrastructure.Persistence.Repositories;
namespace Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HotelContext _context;

        public IRoomRepository Rooms { get; private set; }
        public IRoomTypeRepository RoomTypes { get; private set; }
        public ICustomerRepository Customers { get; private set; }
        public IContractRepository Contracts { get; private set; }
        public IEmployerRepository Employers { get; private set; }
        public IServiceRepository ServiceRooms { get; private set; }
        public IBillRepository Bills { get; private set; }
        public IContractDetailRepository ContractDetails {get;private set;}

        public UnitOfWork(HotelContext context)
        {
            Rooms = new RoomRepository(context);
            RoomTypes = new RoomTypeRepository (context);
            Customers = new CustomerRepository (context);
            Contracts = new ContractRepository (context);
            Employers = new EmployerRepository (context);
            ServiceRooms = new ServiceRepository (context);
            Bills = new BillRepository (context);
            ContractDetails = new ContractDetailRepository (context);

            _context = context;
        }


        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}