using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public class WashingDiscount
    {
        public int WashingDiscountId { get; set; }
        public string DiscountName { get; set; }
        public decimal TotalDiscount { get; set; }
    }
}
