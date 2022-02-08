using carwash.Model.Context;
using carwash.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository
{
    public class UnitOfWork:IUnitOfWork
    {
        private CarwashDbContext _context;
        private IAuthRepository _authRepository;
        private IProgramsRepository _programsRepository;
        private IJwtRepository _jwtRepository;

        public IJwtRepository JwtService {
            get
            {
                if (_jwtRepository == null) _jwtRepository = new JwtRepository();
                return _jwtRepository;
            } 
        }

        public IAuthRepository Auth
        {
            get
            {
                if (_authRepository == null) _authRepository = new AuthRepository(_context);
                return _authRepository;
            }
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public UnitOfWork(CarwashDbContext context)
        {
            _context = context;
        }
    }
}
