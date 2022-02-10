using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Dtos
{
    public class DiscountDto
    {
        public bool HasDiscount { get; set; }
        public int WashingsUntilDiscount { get; set; }

        public void CalculateWashingsTillDiscount(int count)
        {
            int x = count % 10;
            this.WashingsUntilDiscount= 10 - x - 1;
        }
    }
}
