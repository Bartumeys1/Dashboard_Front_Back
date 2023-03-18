using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dashboard.Data.Data.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string ImageName { get;set; }
        public string ShortDescription { get; set; }
        public string FullDescription { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime LastModified { get; set; }

        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; }
    }
}
