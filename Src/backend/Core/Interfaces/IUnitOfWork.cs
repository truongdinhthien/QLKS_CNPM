using System;
namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRoomRepository Rooms { get; }
        IRoomTypeRepository RoomTypes {get;}
        ICustomerRepository Customers{get;}
        IContractRepository Contracts {get;}
        IEmployerRepository Employers {get;}
        IServiceRepository ServiceRooms {get;}
        IBillRepository Bills {get;}
        IContractDetailRepository ContractDetails{get;}


        int Complete();
    }
}