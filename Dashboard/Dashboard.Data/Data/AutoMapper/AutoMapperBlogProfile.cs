using AutoMapper;
using Dashboard.Data.Data.Classes;
using Dashboard.Data.Data.Models;
using Dashboard.Data.Data.ViewModels.BlogVM;
using Dashboard.Data.Data.ViewModels.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Data.AutoMapper
{
    public class AutoMapperBlogProfile:Profile
    {
        public AutoMapperBlogProfile()
        {
            CreateMap<Blog, ShowBlogVM>();
            CreateMap<RegistrateBlogVM, Blog>();
            CreateMap<ShowBlogVM, Blog>();
            CreateMap<EditeBlogVM, Blog>();

        }
    }
}
