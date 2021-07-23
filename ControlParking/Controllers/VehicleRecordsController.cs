using ControlParking.Context;
using ControlParking.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControlParking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleRecordsController : ControllerBase
    {
        ParkingContext db = new ParkingContext();

        // GET: api/<VehicleRecordsController>
        [HttpGet]
        public IEnumerable<VehicleRecords> Get()
        {
            try
            {
                return db.VehicleRecords.Where(p => p.Exit == null && p.Amount == null).ToList();
            }
            catch
            {
                throw;
            }
        }

        // GET api/<VehicleRecordsController>/5
        /*[HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }*/

        // POST api/<VehicleRecordsController>
        [HttpPost]
        public int Create([FromBody] VehicleRecords vehicleRecords)
        {
            // retornar 1 inserido, 2 nao inserido devido estar estacionado, 0 erro ao inserir!
            try
            {
                var validate = vehicleRecords.Plates.Replace("_", "");
                if (validate.Length == 8)
                {
                    if (vehicleRecords.Id == 0)
                    {
                        var Input = db.VehicleRecords.Where(p => p.Plates == vehicleRecords.Plates && p.Exit == null).ToList();
                        if (Input.Count > 0)
                        {
                            return 2;
                        }
                        DateTime date = DateTime.Now;
                        int id = db.VehicleRecords.OrderByDescending(p => p.Id).FirstOrDefault() == null ? 1 : db.VehicleRecords.OrderByDescending(p => p.Id).FirstOrDefault().Id + 1;
                        var vehicle = new VehicleRecords { Id = id, IdVehicles = vehicleRecords.IdVehicles, Plates = vehicleRecords.Plates, Input = DateTime.Parse(date.ToString("dd/MM/yyyy H:mm"), CultureInfo.CreateSpecificCulture("pt-BR")) };
                        db.VehicleRecords.Add(vehicle);
                        db.SaveChanges();
                        return 1;
                    }
                }
                return 0;
            }
            catch
            {
                throw;
            }
        }

        // PUT api/<VehicleRecordsController>/5
        [HttpPut("{id}")]
        public float Edit(int id)
        {
            try
            {
                var Alter = db.VehicleRecords.FirstOrDefault(p => p.Id == id && p.Exit == null);
                if (Alter != null && Alter.Id == id)
                {
                    var ValueHour = db.Vehicles.Where(p => p.Id == Alter.IdVehicles).Select(q => q.ValueVehicles).FirstOrDefault();
                    DateTime date = DateTime.Now;
                    Alter.Exit = DateTime.Parse(date.ToString("dd/MM/yyyy H:mm"), CultureInfo.CreateSpecificCulture("pt-BR"));
                    var Input = new TimeSpan(Alter.Input.Hour, Alter.Input.Minute, Alter.Input.Second);
                    var Exit = new TimeSpan(Alter.Exit.Value.Hour, Alter.Exit.Value.Minute, Alter.Exit.Value.Second);
                    var ValueSeconds = ValueHour / 60;
                    var timeWait = Exit - Input;
                    Alter.Amount = (float?)Math.Round(timeWait.TotalMinutes * ValueSeconds, 2);
                    db.VehicleRecords.Update(Alter);
                    db.SaveChanges();
                    return (float)Alter.Amount;
                }
                return 0;
            }
            catch
            {
                throw;
            }
        }

        // DELETE api/<VehicleRecordsController>/5
        /*[HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
