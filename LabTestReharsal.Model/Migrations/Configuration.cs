namespace LabTestReharsal.Model.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LabTestReharsal.Model.BusinessDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(LabTestReharsal.Model.BusinessDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Cities.AddOrUpdate(c => c.Name,
                new City { Id = Guid.NewGuid().ToString(), Name="Dhaka" },
                new City { Id = Guid.NewGuid().ToString(), Name = "Khulna" },
                new City { Id = Guid.NewGuid().ToString(), Name = "Borishal" },
                new City { Id = Guid.NewGuid().ToString(), Name = "Jessore" },
                new City { Id = Guid.NewGuid().ToString(), Name = "Noakhali" },
                new City { Id = Guid.NewGuid().ToString(), Name = "Rangpur" },
                new City { Id = Guid.NewGuid().ToString(), Name = "Bhola" });


        }
    }
}
