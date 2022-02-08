using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public class BasicWashOptions:Options
    {
        private readonly decimal _dryingPrice = 2;
        private readonly decimal _waxPrice = 2;
        public bool UseDrying { get; set; }
        public bool UseWaxProtection { get; set; }
        public override decimal GetPrice(Program program)
        {
            decimal price = program.Price;
            if (UseDrying) price += _dryingPrice;
            if (UseWaxProtection) price += _waxPrice;

            return price;
        }
    }
}
