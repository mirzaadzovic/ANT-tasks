using carwash.Model.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carwash.API
{
    public class SetupService
    {
        public void Init(CarwashDbContext context)
        {
            context.Database.Migrate();
        }
    }
}
