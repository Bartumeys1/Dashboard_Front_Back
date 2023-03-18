using Dashboard.Data.Data.ViewModels.BlogVM;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dashboard.Data.Validation.Blog
{
    public class UpdateBlogValidation: AbstractValidator<EditeBlogVM>
    {
        public UpdateBlogValidation()
        {
            RuleFor(r=>r.Id).NotEmpty();
            RuleFor(r=>r.Title).NotEmpty();
            RuleFor(r=>r.ShortDescription).NotEmpty();
            RuleFor(r=>r.FullDescription).NotEmpty();
            RuleFor(r=>r.ImageName).NotEmpty();
        }
    }
}
