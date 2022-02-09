using carwash.Dtos.Requests;
using carwash.Repository.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carwash.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class WashingsController:ControllerBase
    {
        private readonly IUnitOfWork _repository;
        public WashingsController(IUnitOfWork repository)
        {
            _repository = repository;
        }
        [HttpGet("Discount/{customerId}")]
        public IActionResult GetDiscount([FromQuery] Guid customerId)
        {
            try
            {
                var hasDiscount = _repository.Washings.HasDiscount(customerId);
                return Ok(hasDiscount);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        public IActionResult Insert([FromBody] WashingInsertRequest request=null)
        {
            try
            {
                if (request == null) return BadRequest("No body");
                var washing = _repository.Washings.Insert(request);
                return Ok(washing);
            }
            catch
            {
                return StatusCode(500);
            }
        }



    }
}
