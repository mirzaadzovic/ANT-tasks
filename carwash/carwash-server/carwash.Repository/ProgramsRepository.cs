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
    public class ProgramsRepository : BaseRepository<Program>, IProgramsRepository
    {
        public ProgramsRepository(CarwashDbContext context) : base(context)
        {
        }

    }
}
