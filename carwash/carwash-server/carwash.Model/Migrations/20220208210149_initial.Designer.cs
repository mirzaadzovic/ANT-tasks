﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using carwash.Model.Context;

namespace carwash.Model.Migrations
{
    [DbContext(typeof(CarwashDbContext))]
    [Migration("20220208210149_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.14")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("carwash.Model.Models.Customer", b =>
                {
                    b.Property<Guid>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordSalt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CustomerId");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasFilter("[Username] IS NOT NULL");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("carwash.Model.Models.Options", b =>
                {
                    b.Property<Guid>("OptionsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OptionsId");

                    b.ToTable("Options");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Options");
                });

            modelBuilder.Entity("carwash.Model.Models.Program", b =>
                {
                    b.Property<int>("ProgramId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("money");

                    b.HasKey("ProgramId");

                    b.ToTable("Programs");

                    b.HasData(
                        new
                        {
                            ProgramId = 1,
                            Name = "Basic Wash",
                            Price = 3m
                        },
                        new
                        {
                            ProgramId = 2,
                            Name = "Active Foam Wash",
                            Price = 7m
                        },
                        new
                        {
                            ProgramId = 3,
                            Name = "Self-Service Wash",
                            Price = 1m
                        });
                });

            modelBuilder.Entity("carwash.Model.Models.Washing", b =>
                {
                    b.Property<Guid>("WashingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("DiscountId")
                        .HasColumnType("int");

                    b.Property<int>("ProgramId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("money");

                    b.Property<DateTime>("WashingDate")
                        .HasColumnType("datetime2");

                    b.HasKey("WashingId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("DiscountId");

                    b.HasIndex("ProgramId");

                    b.ToTable("Washings");
                });

            modelBuilder.Entity("carwash.Model.Models.WashingDiscount", b =>
                {
                    b.Property<int>("WashingDiscountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiscountName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TotalDiscount")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("WashingDiscountId");

                    b.ToTable("Discounts");
                });

            modelBuilder.Entity("carwash.Model.Models.ActiveSoapWashOptions", b =>
                {
                    b.HasBaseType("carwash.Model.Models.Options");

                    b.Property<int>("FoamType")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("ActiveSoapWashOptions");
                });

            modelBuilder.Entity("carwash.Model.Models.BasicWashOptions", b =>
                {
                    b.HasBaseType("carwash.Model.Models.Options");

                    b.Property<bool>("UseDrying")
                        .HasColumnType("bit");

                    b.Property<bool>("UseWaxProtection")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("BasicWashOptions");
                });

            modelBuilder.Entity("carwash.Model.Models.SelfServiceWashOptions", b =>
                {
                    b.HasBaseType("carwash.Model.Models.Options");

                    b.Property<int>("Minutes")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("SelfServiceWashOptions");
                });

            modelBuilder.Entity("carwash.Model.Models.Options", b =>
                {
                    b.HasOne("carwash.Model.Models.Washing", "Washing")
                        .WithOne("Options")
                        .HasForeignKey("carwash.Model.Models.Options", "OptionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Washing");
                });

            modelBuilder.Entity("carwash.Model.Models.Washing", b =>
                {
                    b.HasOne("carwash.Model.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("carwash.Model.Models.WashingDiscount", "Discount")
                        .WithMany()
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("carwash.Model.Models.Program", "Program")
                        .WithMany()
                        .HasForeignKey("ProgramId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Discount");

                    b.Navigation("Program");
                });

            modelBuilder.Entity("carwash.Model.Models.Washing", b =>
                {
                    b.Navigation("Options");
                });
#pragma warning restore 612, 618
        }
    }
}
