using Dashboard.Data.Data.ViewModels.BlogVM;
using Dashboard.Data.Validation.Blog;
using Dashboard.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : Controller
    {
        private BlogService _blogService;
        public BlogController(BlogService blogRepository)
        {
            _blogService = blogRepository;
        }

        [AllowAnonymous]
        [HttpPost("CreateNewPost")]
        public async Task<IActionResult> CreateBlogAsync([FromBody] RegistrateBlogVM model)
        {
            var validator = new RegistrationBlogValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _blogService.CreatePostAsync(model);
                return Ok(result);
            }

            return BadRequest(validationResult.Errors);

        }


        [AllowAnonymous]
        [HttpPost("DeletePost")]
        public async Task<IActionResult> DeleteBlogAsync(int id)
        {
            Console.WriteLine($"delete {id}");
            var result = await _blogService.DeleteBlogByIdAsync(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [AllowAnonymous]
        [HttpPost("EditPost")]
        public async Task<IActionResult> UpdateBlogAsync([FromBody] EditeBlogVM model)
        {
            var validator = new UpdateBlogValidation();
            var validationResult = await validator.ValidateAsync(model);
            if (validationResult.IsValid)
            {
                var result = await _blogService.UpdatePostAsync(model);
                return Ok(result);
            }

            return BadRequest(validationResult.Errors);
        }


        [HttpGet("GetPosts")]
        public async Task<IActionResult> GetBlogsAsync(int start, int end, bool isAll = false)
        {
            var result = await _blogService.GetPostsAsync(start, end, isAll);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("GetTopPosts")]
        public async Task<IActionResult> GetTopPostsAsync(int count)
        {
            var result = await _blogService.GetTopPostsAsync(count);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


    }
}
