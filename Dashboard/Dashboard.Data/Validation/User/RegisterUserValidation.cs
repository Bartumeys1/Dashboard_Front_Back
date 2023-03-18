using Dashboard.Data.Data.ViewModels.UserVM;
using FluentValidation;


namespace Dashboard.Data.Validation.User
{
    public class RegisterUserValidation : AbstractValidator<RegisterUserVM>
    {
        public RegisterUserValidation()
        {
            RuleFor(r => r.Name).NotEmpty();
            RuleFor(r => r.Surname).NotEmpty();
            RuleFor(r => r.PhoneNumber).NotEmpty();
            RuleFor(r => r.Role).NotEmpty();
            RuleFor(r => r.Email).EmailAddress().NotEmpty();
            RuleFor(r => r.Password).MinimumLength(6).NotEmpty();
            RuleFor(r => r.ConfirmPassword).MinimumLength(6).NotEmpty();
        }
    }
}
