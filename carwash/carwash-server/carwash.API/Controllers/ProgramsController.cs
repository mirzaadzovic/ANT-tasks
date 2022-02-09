using carwash.Repository.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carwash.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ProgramsController:ControllerBase
    {
        private readonly IUnitOfWork _repository;
        public ProgramsController(IUnitOfWork repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var response = _repository.Programs.Get();
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var response = _repository.Programs.GetById(id);
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
