using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public enum FoamType
    {
        DrActive,
        ProNano,
        Default
    }
    public class ActiveSoapWashOptions:Options
    {
        public FoamType FoamType { get; set; }
        public override decimal GetPrice(Program program)
        {
            decimal price = program.Price;
            if (FoamType == FoamType.DrActive) return price+2;
            else return price+4;
        }
    }
}
