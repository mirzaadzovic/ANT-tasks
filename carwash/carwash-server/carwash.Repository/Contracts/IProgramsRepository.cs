using carwash.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository.Contracts
{
    public interface IProgramsRepository
    {
        IEnumerable<Program> Get(); 
    }
}
