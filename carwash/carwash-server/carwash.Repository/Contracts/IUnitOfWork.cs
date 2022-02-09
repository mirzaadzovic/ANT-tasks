using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository.Contracts
{
    public interface IUnitOfWork
    {
        public IJwtRepository JwtService {get;}
        public IAuthRepository Auth {get;}
        public IProgramsRepository Programs { get; }
        public IWashingRepository Washings { get; }
        Task Save();
    }
}
