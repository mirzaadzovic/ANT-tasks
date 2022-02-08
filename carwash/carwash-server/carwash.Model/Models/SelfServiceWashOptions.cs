using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public class SelfServiceWashOptions : Options
    {
        public int Minutes { get; set; }
        public override decimal GetPrice(Program program)
        {
            return program.Price * Minutes;
        }
    }
}
