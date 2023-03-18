
using System.ComponentModel.DataAnnotations.Schema;

namespace Dashboard.Data.Data.ViewModels.BlogVM
{
    public class ShowBlogVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageName { get; set; }
        public string ImageUrl { get;set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime LastModified { get; set; }
    }
}
