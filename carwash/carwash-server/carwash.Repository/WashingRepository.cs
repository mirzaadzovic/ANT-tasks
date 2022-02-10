using carwash.Dtos.Requests;
using carwash.Model.Context;
using carwash.Model.Models;
using carwash.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Repository
{
    public class WashingRepository : BaseRepository<Washing>, IWashingRepository
    {
        public WashingRepository(CarwashDbContext context) :base(context)
        {
        }
        
        public Washing Insert(WashingInsertRequest request)
        {
            var options = GetOptions(request);
            var washing = new Washing()
            {
                CustomerId = request.CustomerId,
                ProgramId = request.ProgramId,
                WashingDate = DateTime.Now,
                TotalPrice=CalculatePrice(options, (int)request?.ProgramId, request.CustomerId),
            };

            _context.Washings.Add(washing);
            _context.SaveChanges();

            options.OptionsId = washing.WashingId;
            _context.Options.Add(options);
            _context.SaveChanges();


            return washing;
        }

        public decimal CalculatePrice(Options options, int programId, Guid customerId)
        {
            var program = _context.Set<Program>().Find(programId);
            decimal discount = 1;
            if (HasDiscount(customerId)) discount -= 0.2m;
            return options.GetPrice(program)*discount;
        }

        public bool HasDiscount(Guid customerId)
        {
            var washings = _context.Washings.Where(w => w.CustomerId == customerId);
            bool isWashingCountDivisibleByTen = (washings.Count() + 1) % 10 == 0;
            return washings.Any() && isWashingCountDivisibleByTen;
        }
        public static Options GetOptions(WashingInsertRequest request)
        {
            Options options = null;
            if(request?.Minutes!=null && request?.Minutes > 0)
            {
                options = new SelfServiceWashOptions()
                {
                    Minutes = (int)request.Minutes
                };
            }
            else if (request?.UseDrying != null)
            {
                options = new BasicWashOptions()
                {
                    UseDrying = (bool)request.UseDrying,
                    UseWaxProtection = (bool)request.UseWaxProtection,
                };
            }
            else if(request?.FoamType!=null)
            {
                options = new ActiveSoapWashOptions()
                {
                    FoamType = (FoamType)(request?.FoamType)
                };
            }
            return options;

        }
    }
}
