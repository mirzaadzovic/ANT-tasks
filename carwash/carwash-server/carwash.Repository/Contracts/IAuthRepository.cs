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
    public interface IAuthRepository:IBaseRepository<Customer>
    {
        CustomerDto Register(CustomerInsertRequest request);
        CustomerDto Login(string username, string password);
    }
}
