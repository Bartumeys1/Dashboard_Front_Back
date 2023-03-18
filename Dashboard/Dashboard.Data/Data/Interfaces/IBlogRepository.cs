using Dashboard.Data.Data.Models;

namespace Dashboard.Data.Data.Interfaces
{
    public interface  IBlogRepository
    {
        public Task<Blog> GetPostByIdAsync(int id);
        public Task<int> CreatePostAsync(Blog model);
        public Task<int> UpdatePostAsync(Blog model);
        public Task<int> DeleteBlogAsync(Blog model);
        public Task<List<Blog>> GetPostssAsync(int start, int end, bool All = false);
        public Task<List<Blog>> GetTopPostsAsync(int number);
    }
}
