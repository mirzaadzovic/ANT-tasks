using carwash.Model.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace carwash.Model.Context
{
    public class CarwashDbContext:DbContext
    {
        public CarwashDbContext(DbContextOptions<CarwashDbContext> options):base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Program> Programs { get; set; }
        public DbSet<WashingDiscount> Discounts { get; set; }
        public DbSet<Washing> Washings { get; set; }
        public DbSet<Options> Options { get; set; }
        public DbSet<BasicWashOptions> BasicOptions { get; set; }
        public DbSet<SelfServiceWashOptions> SelfServiceOptions { get; set; }
        public DbSet<ActiveSoapWashOptions> ActiveSoapOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Customer>()
                .HasIndex(u => u.Username)
                .IsUnique();

            builder.Entity<Program>()
                 .Property(p => p.Price)
                 .HasColumnType("money");

            builder.Entity<Washing>()
                 .Property(p => p.TotalPrice)
                 .HasColumnType("money");

            builder.Entity<Washing>()
               .HasOne(o=>o.Options)
               .WithOne(w=>w.Washing)
               .HasForeignKey<Options>(o=>o.OptionsId);


            builder.Entity<Program>().HasData(new Program()
            {
                ProgramId=1,
                Name="Basic Wash",
                Price=3,
            });

            builder.Entity<Program>().HasData(new Program()
            {
                ProgramId = 2,
                Name = "Active Foam Wash",
                Price = 7,
            });

            builder.Entity<Program>().HasData(new Program()
            {
                ProgramId = 3,
                Name = "Self-Service Wash",
                Price = 1,
            });
        }
    }
}
