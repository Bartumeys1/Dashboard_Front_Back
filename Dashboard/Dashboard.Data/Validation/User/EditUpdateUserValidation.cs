using Dashboard.Data.Data.ViewModels.UserVM;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Validation.User
{
    public class EditUpdateUserValidation : AbstractValidator<EditUpdateUserVM>
    {
        public EditUpdateUserValidation()
        {

            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.FirstName).NotEmpty();
            RuleFor(r => r.LastName).NotEmpty();
            RuleFor(r => r.Phone).NotEmpty();
        }
    }
}
