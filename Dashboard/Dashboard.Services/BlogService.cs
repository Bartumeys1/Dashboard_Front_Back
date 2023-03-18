using AutoMapper;
using Dashboard.Data.Data.Interfaces;
using Dashboard.Data.Data.Models;
using Dashboard.Data.Data.ViewModels.BlogVM;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;

namespace Dashboard.Services
{
    public class BlogService
    {
        private const int FAIL_COUNT_OPERATION = 0;

        private readonly IBlogRepository _blogRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public BlogService(IBlogRepository blogRepository, IMapper mapper, IConfiguration configuration)
        {
            _blogRepository = blogRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ServiceResponse> CreatePostAsync(RegistrateBlogVM model)
        {
            Blog newBlog = _mapper.Map<RegistrateBlogVM, Blog>(model);
            newBlog.ImageName = await SaveImageFile(model.ImageData);
            newBlog.AddedDate = DateTime.Now;
            newBlog.LastModified = newBlog.AddedDate;
            var result = await _blogRepository.CreatePostAsync(newBlog);

            if (result > FAIL_COUNT_OPERATION)
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = $"Post {model.Title} successfully created.",
                };

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Post {model.Title} error created.",
            };


        }

        public async Task<ServiceResponse> DeleteBlogByIdAsync(int id)
        {
            Blog blog = await _blogRepository.GetPostByIdAsync(id);
            int deleteResult = 0;
            if (blog != null)
            {
                deleteResult = await _blogRepository.DeleteBlogAsync(blog);
                DeleteImage(blog.ImageName);
            }

            if (deleteResult > FAIL_COUNT_OPERATION)
                return new ServiceResponse
                {
                    IsSuccess = true,
                    Message = $"Post {blog?.Title} was deleted successfully",
                };

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error: Post by ID: {id} was not fount",
            };
        }

        public async Task<ServiceResponse> UpdatePostAsync(EditeBlogVM model)
        {
            Blog newBlog = _mapper.Map<Blog>(model);

            Blog oldBlog = await _blogRepository.GetPostByIdAsync(newBlog.Id);

            if (oldBlog != null)
            {
                oldBlog.Title = model.Title;
                oldBlog.ShortDescription = model.ShortDescription;
                oldBlog.FullDescription = model.FullDescription;
                oldBlog.LastModified = DateTime.Now;
                oldBlog.ImageName = model.ImageName; // delete old image

                var resultCount = await _blogRepository.UpdatePostAsync(oldBlog);
                if (resultCount > FAIL_COUNT_OPERATION)
                    return new ServiceResponse
                    {
                        IsSuccess = true,
                        Message = $"Post by ID: {newBlog.Id} was updated successfully",
                    };
            }
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error: Post by ID: {model.Id} was not fount",
            };
        }

        public async Task<ServiceResponse> GetPostsAsync(int start, int end, bool isAll = false)
        {

            List<Blog> blogs = await _blogRepository.GetPostssAsync(start, end, isAll);
            List<ShowBlogVM> mappedBlogs = blogs.Select(u => _mapper.Map<Blog, ShowBlogVM>(u)).ToList();

            foreach (var item in mappedBlogs)
            {
                item.ImageUrl = GetImageUrl(item.ImageName);
            }

            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = mappedBlogs,
                Message = $"Posts loaded."
            };
        }

        public async Task<ServiceResponse> GetTopPostsAsync(int number)
        {
            List<Blog> result = await _blogRepository.GetTopPostsAsync(number);
            List<ShowBlogVM> mappedBlogs = result.Select(u => _mapper.Map<Blog, ShowBlogVM>(u)).Reverse().ToList();

            foreach (var item in mappedBlogs)
            {
                item.ImageUrl = GetImageUrl(item.ImageName);
            }

            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = mappedBlogs,
                Message = $"Posts loaded."
            };
        }



        private string path = "./wwwroot/images/";
        private async Task<string> SaveImageFile(string data)
        {
            var fileName = Guid.NewGuid().ToString() + ".png";
            string ImagePath = path + fileName;


            var base64Data = Regex.Match(data, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;

            var binData = Convert.FromBase64String(base64Data);

            using (var stream = new MemoryStream(binData))
            {
                await File.WriteAllBytesAsync(ImagePath, binData);
            }
            return fileName;
        }

        private void DeleteImage(string name)
        {

            string imagePath = Path.Combine(path, name);
            if (!File.Exists(imagePath))
                return ;

            File.Delete(imagePath);
        }

        private string GetImageUrl(string imageName)
        {
            string host = _configuration["HostSettings:URL"];
            return host + "/" + "StaticFiles/" + "images/" + imageName;
        }



    }
}
