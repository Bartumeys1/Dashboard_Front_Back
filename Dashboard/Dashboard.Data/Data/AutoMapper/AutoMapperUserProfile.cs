﻿using AutoMapper;
using Dashboard.Data.Data.Models;
using Dashboard.Data.Data.ViewModels.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Data.AutoMapper
{
    public class AutoMapperUserProfile : Profile
    {
        public AutoMapperUserProfile()
        {
            CreateMap<AppUser, RegisterUserVM>();
            CreateMap<RegisterUserVM, AppUser>()
                .ForMember(dst => dst.UserName , obj => obj.MapFrom(src=>src.Email));

            CreateMap<AppUser, ShowUserVM>();
        }
    }
}
