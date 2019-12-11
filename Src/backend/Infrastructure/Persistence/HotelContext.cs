using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Persistence
{
    public class HotelContext : DbContext
    {
        public HotelContext(DbContextOptions<HotelContext> options) : base(options)
        {

        }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<ContractDetail> ContractDetails { get; set; }
        public DbSet<RoomService> RoomServices { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Set name of a table in SQLite
            modelBuilder.Entity<Room>().ToTable("Room");
            modelBuilder.Entity<RoomType>().ToTable("RoomType");
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Employer>().ToTable("Employer");
            modelBuilder.Entity<Contract>().ToTable("Contract");
            modelBuilder.Entity<ContractDetail>().ToTable("ContractDetail");
            modelBuilder.Entity<RoomService>().ToTable("RoomService");
            modelBuilder.Entity<Bill>().ToTable("Bill");
            //Property Tabel
            //Room
            modelBuilder.Entity<Room>()
                        .HasKey(r => r.RoomId);

            //Fluent API Config Relationship
            //Room - Roomtype (One to many)
            // modelBuilder.Entity<Room>()
            //             .HasOne(r => r.RoomType)
            //             .WithMany(rt => rt.Rooms)
            //             .HasForeignKey(r => r.RoomTypeId);

            // //Service-Contract (Many to many)
            // modelBuilder.Entity<ContractDetail>().HasKey(cd => new {cd.ContractId,cd.RoomServiceId});
            modelBuilder.Entity<ContractDetail>().HasKey(cd => cd.ContractDetailId);

            // modelBuilder.Entity<ContractDetail>()
            //             .HasOne(cd => cd.RoomService)
            //             .WithMany(s => s.ContractDetails)
            //             .HasForeignKey(cd => cd.RoomServiceId);

            // modelBuilder.Entity<ContractDetail>()
            //             .HasOne(cd => cd.Contract)
            //             .WithMany(c => c.ContractDetails)
            //             .HasForeignKey(cd => cd.ContractId);
                        

            //Customer-Contract (One to many)
            // modelBuilder.Entity<Contract>()
            //             .HasOne(c => c.Customer)
            //             .WithMany(cu => cu.Contracts)
            //             .HasForeignKey(c => c.CustomerId);
            // modelBuilder.Entity<Contract>()
            //             .Property(c => c.DateIn)
            //             .HasColumnType("datetime2");
            // modelBuilder.Entity<Contract>()
            //             .Property(c => c.DateOut)
            //             .HasColumnType("datetime2");
            // modelBuilder.Entity<ContractDetail>()
            //             .Property(cd => cd.TimeAdded)
            //             .HasColumnType("datetime2");

            //Room - Contract (One to many)
            // modelBuilder.Entity<Contract>()
            //             .HasOne(c => c.Room)
            //             .WithMany(r => r.Contracts)
            //             .HasForeignKey(c => c.RoomId);

            //Bill - Contract (One to One)
            modelBuilder.Entity<Contract>()
                        .HasOne(c => c.Bill)
                        .WithOne(b => b.Contract)
                        .HasForeignKey<Bill>(b => b.ContractId);
            // //Employer - Contract (One to Many)
            // modelBuilder.Entity<Contract>()
            //             .HasOne(c => c.Employer)
            //             .WithMany(e => e.Contracts)
            //             .HasForeignKey(c => c.EmployerId);

            // //Employer - Bill (One to Many)
            // modelBuilder.Entity<Bill>()
            //             .HasOne(b => b.Employer)
            //             .WithMany(e => e.Bills)
            //             .HasForeignKey(b => b.EmployerId);

            base.OnModelCreating(modelBuilder);

        }
    }
}
