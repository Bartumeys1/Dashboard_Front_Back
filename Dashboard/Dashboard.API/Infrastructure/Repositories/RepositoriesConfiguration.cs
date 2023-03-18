using Dashboard.Data.Data.Classes;
using Dashboard.Data.Data.Interfaces;

namespace Dashboard.API.Infrastructure.Repositories
{
    public class RepositoriesConfiguration
    {
        public static void Config (IServiceCollection services)
        {
            //Add User Repository
            services.AddScoped<IUserRepository, UserRepository>();

            //Add Blog Repository
            services.AddScoped<IBlogRepository, BlogRepository>();
        }
    }
}
