using System;

namespace ControlParking.Models
{
    public class VehicleRecords
    {
        public int Id { get; set; }

        public int IdVehicles { get; set; }

        public string Plates { get; set; }

        public DateTime Input { get; set; }

        public Nullable<DateTime> Exit { get; set; }

        public Nullable<float> Amount { get; set; }
    }
}
