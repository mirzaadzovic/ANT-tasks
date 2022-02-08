using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public class Washing
    {
        public Guid WashingId { get; set; }
        public DateTime WashingDate { get; set; }
        public decimal TotalPrice { get; set; }
        public int ProgramId { get; set; }
        public Program Program { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int DiscountId { get; set; }
        public WashingDiscount Discount { get; set; }
        public Options Options { get; set; }
        public void GetTotalPrice()
        {
            this.TotalPrice = Options.GetPrice(Program);
        }
    }
}
