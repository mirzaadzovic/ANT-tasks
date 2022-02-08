using carwash.Dtos;
using carwash.Dtos.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Models
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public DateTime RegistrationDate { get; set; }
   
        public static string GenerateSalt()
        {
            var buf = new byte[16];
            (new RNGCryptoServiceProvider()).GetBytes(buf);
            return Convert.ToBase64String(buf);
        }
        public string GenerateHash(string password)
        {
            byte[] src = Convert.FromBase64String(this.PasswordSalt);
            byte[] bytes = Encoding.Unicode.GetBytes(password);
            byte[] dst = new byte[src.Length + bytes.Length];

            System.Buffer.BlockCopy(src, 0, dst, 0, src.Length);
            System.Buffer.BlockCopy(bytes, 0, dst, src.Length, bytes.Length);

            HashAlgorithm algorithm = HashAlgorithm.Create("SHA1");
            byte[] inArray = algorithm.ComputeHash(dst);
            return Convert.ToBase64String(inArray);
        }

        public void GeneratePassword(string password)
        {
            this.PasswordSalt = GenerateSalt();
            this.PasswordHash = GenerateHash(password);
        }

        public bool ValidateUser(string password)
        {
            string passwordHash = GenerateHash(password);
            return passwordHash == this.PasswordHash;
        }

        public static Customer Map(CustomerInsertRequest request)
        {
            Customer customer = new()
            {
                Username = request.Username,
            };
            return customer;
        }

        public static CustomerDto Map(Customer request)
        {
            var customer = new CustomerDto()
            {
                CustomerId = request.CustomerId,
                Username = request.Username,
                RegistrationDate = request.RegistrationDate,
            };
            return customer;
        }
    }
}
