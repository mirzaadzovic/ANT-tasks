using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public class Options
    {
        [Key]
        public Guid OptionsId { get; set; }
        public Washing Washing { get; set; }
        public virtual decimal GetPrice(Program program) 
        {
            return program.Price;
        }

    }
}
