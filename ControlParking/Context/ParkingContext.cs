using ControlParking.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlParking.Context
{
    public class ParkingContext : DbContext
    {
        public ParkingContext(DbContextOptions<ParkingContext> options) : base(options) { }

        public ParkingContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "InMemoryParking");
        }

        public DbSet<Vehicles> Vehicles { get; set; }

        public DbSet<VehicleRecords> VehicleRecords { get; set; }
    }
}
