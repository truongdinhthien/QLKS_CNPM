using Core.Interfaces;
namespace Core.Entities
{
    public class Bill : IAggregateRoot
    {
        public int BillId { get; set; }
        public int PriceRentRoom {get;set;}
        public int PriceTotalService {get;set;}
        public int TotalPrice {get;set;}
        //1 hoa don co 1 hop dong
        public int ContractId {get;set;}
        public virtual Contract Contract {get;set;}
        
        public int EmployerId {get;set;}
        public Employer Employer {get;set;}
    }
}