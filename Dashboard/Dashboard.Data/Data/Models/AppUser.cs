using Microsoft.AspNetCore.Identity;

namespace Dashboard.Data.Data.Models
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool EmailConfirmed { get; set; }
    }
}
