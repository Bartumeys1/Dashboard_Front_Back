using Dashboard.Data.Data.ViewModels;
using FluentValidation;


namespace Dashboard.Data.Validation
{
    public class TokenRequestValidation : AbstractValidator<TokenRequestVM>
    {
        public TokenRequestValidation()
        {
            RuleFor(r => r.Token).NotEmpty();
            RuleFor(r => r.RefreshToken).NotEmpty();
        }
    }
}
