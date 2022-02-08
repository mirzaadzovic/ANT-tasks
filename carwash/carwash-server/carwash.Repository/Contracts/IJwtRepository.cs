using carwash.Dtos;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository.Contracts
{
    public interface IJwtRepository
    {
        string Sign(CustomerDto customer);
        JwtSecurityToken Verify(string token);
    }
}
