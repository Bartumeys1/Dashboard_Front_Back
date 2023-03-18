using Dashboard.Data.Data.ViewModels.UserVM;
using FluentValidation;


namespace Dashboard.Data.Validation.User
{
    public class ProfileUserValidation : AbstractValidator<ProfileUserVM>
    {
        public ProfileUserValidation()
        {
            RuleFor(r => r.FirstName).NotEmpty();
            RuleFor(r => r.LastName).NotEmpty();
            RuleFor(r => r.Email).NotEmpty().EmailAddress();
            RuleFor(r => r.Phone).NotEmpty();
        }
    }
}
