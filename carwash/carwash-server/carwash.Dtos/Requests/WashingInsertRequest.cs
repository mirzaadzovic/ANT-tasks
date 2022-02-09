using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Dtos.Requests
{
    public class WashingInsertRequest
    {
        public Guid CustomerId { get; set; }
        public int ProgramId { get; set; }
        public bool? UseDrying { get; set; }
        public bool? UseWaxProtextion { get; set; }
        public int? Minutes { get; set; }
        public int? FoamType { get; set; }

    }
}
