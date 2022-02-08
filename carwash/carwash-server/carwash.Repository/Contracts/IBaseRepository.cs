using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository.Contracts
{
    public interface IBaseRepository<T> where T:class
    {
        IEnumerable<T> Get();
        T GetById(int id);
    }
}
