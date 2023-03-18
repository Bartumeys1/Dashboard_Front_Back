using Dashboard.Data.Data.Context;
using Dashboard.Data.Data.Interfaces;
using Dashboard.Data.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace Dashboard.Data.Data.Classes
{
    public class BlogRepository : IBlogRepository
    {
        public async Task<int> CreatePostAsync(Blog model)
        {
            int countChange = 0;
            using (var _context = new AppDbContext())
            {
                await _context.Blogs.AddAsync(model);
                countChange = await _context.SaveChangesAsync();
            }

            return countChange;
        }

        public async Task<int> DeleteBlogAsync(Blog model)
        {
            using(var _context = new AppDbContext())
            {
                _context.Remove(model);
                int countDeleted = await _context.SaveChangesAsync();
                return countDeleted;
            }
        }

        public async Task<Blog> GetPostByIdAsync(int id)
        {
            using(var _context = new AppDbContext())
            {
                return await _context.Blogs.FirstOrDefaultAsync(b => b.Id == id);
            }
        }

        public async Task<List<Blog>> GetPostssAsync(int start, int end, bool isAll = false)
        {
            if (isAll)
            {
                using(var _context = new AppDbContext())
                {
                    return await _context.Blogs.ToListAsync();
                }
            }

            using (var _context = new AppDbContext())
            {
              return _context.Blogs.ToList().Take(new Range(new Index(start), new Index(end))).ToList();
            }
        }

        public async Task<List<Blog>> GetTopPostsAsync(int number)
        {
            using (var _context = new AppDbContext())
            {
                var posts = _context.Blogs;
                return await posts.Skip(Math.Max(0, posts.Count() - number)).ToListAsync();
               // return await posts.TakeLast(number).ToListAsync(); 
            }
        }


        public async Task<int> UpdatePostAsync(Blog model)
        {
            int countUdpated = 0;
            using (var _context =new AppDbContext())
            {
                _context.Blogs.Update(model);
                 countUdpated =  await _context.SaveChangesAsync();
                return countUdpated;
            }
        }
    }
}
