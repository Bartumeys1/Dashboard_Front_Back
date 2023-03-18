using Dashboard.Data.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Dashboard.Data.Data.Context
{
    public class AppDbContext : IdentityDbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionBuilder.UseSqlServer(connectionString);
        }

        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Blog> Blogs { get; set; }
    }
}
