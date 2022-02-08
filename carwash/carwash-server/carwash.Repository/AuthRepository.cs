using carwash.Dtos;
using carwash.Dtos.Requests;
using carwash.Model.Context;
using carwash.Model.Models;
using carwash.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository
{
    public class AuthRepository : BaseRepository<Customer>,IAuthRepository
    {
        private readonly IJwtRepository _jwtService;
        public AuthRepository(CarwashDbContext context) : base(context)
        {
            _jwtService = new JwtRepository();
        }

        public CustomerDto Register(CustomerInsertRequest request)
        {
            var user = _context.Set<Customer>()
                .FirstOrDefault(u => u.Username == request.Username);

            if (user != null) return null;

            var entity = Customer.Map(request);

            entity.GeneratePassword(request.Password);
            entity.RegistrationDate = DateTime.Now;

            _context.Customers.Add(entity);
            _context.SaveChanges();

            return Customer.Map(entity);
        }

        public CustomerDto Login(string username, string password)
        {
            var user = _context.Set<Customer>()
                .FirstOrDefault(u => u.Username == username);

            if (user == null)
                return null;

            if (user.ValidateUser(password))
            {
                return Customer.Map(user);
            }

            return null;
        }

    }
}
