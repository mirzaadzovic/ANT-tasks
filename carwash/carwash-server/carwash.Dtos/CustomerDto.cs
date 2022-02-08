using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Dtos
{
    public class CustomerDto
    {
        public Guid CustomerId { get; set; }
        public string Username { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
