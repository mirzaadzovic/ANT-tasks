using carwash.Dtos;
using carwash.Dtos.Requests;
using carwash.Model.Models;
using carwash.Repository.Contracts;
using Microsoft.AspNetCore.Http;
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

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Wrong username or password");
                }

                var user = _repository.Auth.Login(request.Username, request.Password);

                if (user == null)
                {
                    return BadRequest("Wrong username or password");
                }

                // Generate JWT token
                AppendCookieJWT(user);

                return Ok(user);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CustomerInsertRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Wrong email or password");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Wrong input format");
                }

                var user = _repository.Auth.Register(request);

                if (user == null)
                {
                    return BadRequest("Wrong email or password");
                }

                await _repository.Save();

                // Generate JWT token
                AppendCookieJWT(user);

                return StatusCode(201, user);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("EvilCookie", new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.None, Secure = true });
            return Ok();
        }

        [HttpGet("User")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["EvilCookie"];
                var token = _repository.JwtService.Verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                var user = _repository.Auth.GetById(userId);
                if(user==null) return BadRequest("Invalid token");

                return Ok(Customer.Map(user));
            }
            catch
            {
                return Unauthorized("You are not logged in");
            }

        }

        private void AppendCookieJWT(CustomerDto user)
        {
            var token = _repository.JwtService.Sign(user);
            Response.Cookies.Append("EvilCookie", token, new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            });
        }


    }
}
