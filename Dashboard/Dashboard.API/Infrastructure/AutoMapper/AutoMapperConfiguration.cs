using Dashboard.Data.Data.AutoMapper;
using MailKit;

namespace Dashboard.API.Infrastructure.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static void Config(IServiceCollection services)
        {

            //Add AutoMapper User
            services.AddAutoMapper(typeof(AutoMapperUserProfile));
            //Add AutoMapper Blog
            services.AddAutoMapper(typeof(AutoMapperBlogProfile));
        }
    }
}
