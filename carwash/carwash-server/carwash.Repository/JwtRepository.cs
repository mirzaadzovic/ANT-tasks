using carwash.Dtos;
using carwash.Repository.Contracts;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository
{
    public class JwtRepository:IJwtRepository
    {
        private readonly string _securityKey = "_74r4d4n&m4ljug4n_";
        public string Sign(CustomerDto user)
        {

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_securityKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(credentials);
            var claims = CreateClaims(user);

            var payload = new JwtPayload(user.CustomerId.ToString(), null, claims, DateTime.Now, DateTime.Now.AddHours(1));
            var token = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_securityKey);

            tokenHandler.ValidateToken(token, new TokenValidationParameters()
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            },
            out SecurityToken validatedToken
            );

            return (JwtSecurityToken)validatedToken;
        }

        public static List<Claim> CreateClaims(CustomerDto user)
        {
            var claims = new List<Claim>();


            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.CustomerId.ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.UniqueName, user.Username));

            return claims;
        }

    }
}
