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
        private IWashingRepository _washingRepository;
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

        public IProgramsRepository Programs
        {
            get
            {
                if (_programsRepository == null) _programsRepository = new ProgramsRepository(_context);
                return _programsRepository;
            }
        }
        public IWashingRepository Washings
        {
            get
            {
                if (_washingRepository == null) _washingRepository = new WashingRepository(_context);
                return _washingRepository;
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
