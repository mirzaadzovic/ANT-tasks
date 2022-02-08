using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository.Contracts
{
    public interface IBaseCRUDRepository<T, TInsert>:IBaseRepository<T> where T:class where TInsert:class
    {
      T Insert(TInsert request);
    }
}
