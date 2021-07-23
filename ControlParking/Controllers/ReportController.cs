using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using ControlParking.Context;
using ControlParking.Models;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ControlParking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        ParkingContext db = new ParkingContext();
        // GET: api/<ReportController>
        [HttpGet]
        public IEnumerable<VehicleRecords> Get()
        {
            DateTime date = DateTime.Now;
            return db.VehicleRecords.Where(p => p.Exit != null && p.Exit.Value.Year == date.Year && p.Exit.Value.Month == date.Month && p.Exit.Value.Day == date.Day).ToList();
        }
    }
}
