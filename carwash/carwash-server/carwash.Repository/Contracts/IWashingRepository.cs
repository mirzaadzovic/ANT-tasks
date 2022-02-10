using carwash.Dtos;
using carwash.Dtos.Requests;
using carwash.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository.Contracts
{
    public interface IWashingRepository:IBaseCRUDRepository<Washing, WashingInsertRequest>
    {
        decimal CalculatePrice(Options options, int programId, Guid CustomerId);
        DiscountDto HasDiscount(Guid customerId);
    }
}
