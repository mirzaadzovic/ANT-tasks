using carwash.Model.Context;
using carwash.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository
{
    public class BaseRepository<T>:IBaseRepository<T> where T:class
    {
        protected readonly CarwashDbContext _context;
        public BaseRepository(CarwashDbContext context)
        {
            this._context = context;
        }

        public virtual IEnumerable<T> Get()
        {
            return _context.Set<T>();
        }

        public virtual T GetById(object id)
        {
            return _context.Set<T>().Find(id);
        }
    }
}
