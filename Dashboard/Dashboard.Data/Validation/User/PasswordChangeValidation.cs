using Dashboard.Data.Data.ViewModels.UserVM;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Validation.User
{
    public class PasswordChangeValidation : AbstractValidator<PasswordChangeVM>
    {
        public PasswordChangeValidation()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.OldPassword).NotEmpty().MinimumLength(6);
            RuleFor(x => x.NewPassword).NotEmpty().MinimumLength(6);
            RuleFor(x => x.ConfirmPassword).NotEmpty().MinimumLength(6);
        }
    }
}
