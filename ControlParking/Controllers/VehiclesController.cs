using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ControlParking.Context;
using ControlParking.Models;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControlParking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        ParkingContext db = new ParkingContext();

        // GET: api/<VehiclesController>
        [HttpGet]
        public IEnumerable<Vehicles> Index()
        {
            try
            {
                return db.Vehicles.ToList();
            }
            catch
            {
                throw;
            }
        }

        // GET api/<VehiclesController>/5
        /*[HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }*/

        // POST api/<VehiclesController>
        [HttpPost]
        public void Create([FromBody] List<Vehicles> vehicles)
        {
            try
            {
                if (vehicles.Count > 0)
                {
                    if (db.Vehicles.Count() > 0)
                    {
                        foreach (var vehicle in vehicles)
                        {
                            db.Vehicles.Update(vehicle);
                        }
                    }
                    else
                    {
                        foreach (var vehicle in vehicles)
                        {
                            db.Vehicles.Add(vehicle);
                        }
                    }
                    db.SaveChanges();
                }
            }
            catch
            {
                throw;
            }
        }

        // PUT api/<VehiclesController>/5
        /*[HttpPut("{id}")]
        public void Edit(int id, [FromBody] string value)
        {
        }

        // DELETE api/<VehiclesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
