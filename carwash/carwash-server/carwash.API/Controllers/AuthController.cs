using carwash.Repository.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carwash.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController:ControllerBase
    {
        private readonly IUnitOfWork _repository;
        public AuthController(IUnitOfWork repository)
        {
            _repository = repository;
        }
    }
}
