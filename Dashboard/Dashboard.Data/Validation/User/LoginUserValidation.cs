using Dashboard.Data.Data.ViewModels.UserVM;
using FluentValidation;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Validation.User
{
    public class LoginUserValidation : AbstractValidator<LoginUserVM>
    {
        public LoginUserValidation()
        {
            RuleFor(r => r.Email).EmailAddress().NotEmpty();
            RuleFor(r => r.Password).MinimumLength(6).NotEmpty();
        }
    }
}
