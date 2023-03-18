﻿using Dashboard.Data.Data.Context;
using Dashboard.Data.Data.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Initializer
{
    public class AppDbInitializer
    {
        public static async Task Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
                UserManager<AppUser> userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                if (userManager.FindByNameAsync("master@email.com").Result == null)
                {
                    AppUser admin = new AppUser()
                    {
                        UserName = "master@email.com",
                        Email = "master@email.com",
                        EmailConfirmed = true,
                        Name = "John",
                        Surname = "Snow",
                        PhoneNumber = "(123)-233-4567"
                    };

                    AppUser user = new AppUser()
                    {
                        UserName = "user@email.com",
                        Email = "user@email.com",
                        EmailConfirmed = true,
                        Name = "Bart",
                        Surname = "Simpson",
                        PhoneNumber = "(123)-555-6666"

                    };

                    context.Roles.AddRange(
                        new IdentityRole()
                        {
                            Name = "Administrators",
                            NormalizedName = "ADMINISTRATORS"
                        },
                        new IdentityRole()
                        {
                            Name = "Users",
                            NormalizedName = "USERS"
                        }
                    );

                    await context.SaveChangesAsync();

                    IdentityResult resultadmin = userManager.CreateAsync(admin, "Qwerty-1").Result;
                    IdentityResult resultuser = userManager.CreateAsync(user, "Qwerty-1").Result;

                    if (resultadmin.Succeeded)
                    {
                        userManager.AddToRoleAsync(admin, "Administrators").Wait();
                                   
                    }
                    if (resultuser.Succeeded)
                    {
                        userManager.AddToRoleAsync(user, "Users").Wait();
                    }
                }
            }

        }
    }
}
