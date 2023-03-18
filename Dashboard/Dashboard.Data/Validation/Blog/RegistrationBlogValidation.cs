using Dashboard.Data.Data.ViewModels.BlogVM;
using FluentValidation;

namespace Dashboard.Data.Validation.Blog
{
    public class RegistrationBlogValidation:AbstractValidator<RegistrateBlogVM>
    {
        public RegistrationBlogValidation()
        {
            RuleFor(r=>r.Title).NotEmpty();
            RuleFor(r=>r.ShortDescription).NotEmpty();
            RuleFor(r=>r.FullDescription).NotEmpty();
            RuleFor(r=>r.ImageData).NotEmpty();
            RuleFor(r=>r.UserId).NotEmpty();
        }
    }
}
