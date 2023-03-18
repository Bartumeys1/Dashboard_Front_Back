using Dashboard.Data.Data.Context;
using Dashboard.Data.Data.Interfaces;
using Dashboard.Data.Data.Models;
using Dashboard.Data.Data.ViewModels.UserVM;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Dashboard.Data.Data.Classes
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public UserRepository(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(AppUser model)
        {
            var result = await _userManager.GenerateEmailConfirmationTokenAsync(model);
            return result;
        }


        public async Task<IdentityResult> RegisterUserAsync(AppUser model, string password)
        {
            IdentityResult result = await _userManager.CreateAsync(model, password);
            return result;
        }

        public Task<AppUser> GetUserByIdAsync(string userId)
        {
            var result = _userManager.FindByIdAsync(userId);
            return result;
        }

        public Task<IdentityResult> ConfirmEmailAsync(AppUser model, string token)
        {
            var result = _userManager.ConfirmEmailAsync(model, token);
            return result;
        }

        public async Task<AppUser> FindByEmailAsync(LoginUserVM model)
        {
            var result = await _userManager.FindByEmailAsync(model.Email);
            return result;
        }

        public async Task<bool> ValidatePasswordAsync(LoginUserVM model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            var result = await _userManager.CheckPasswordAsync(user,model.Password);
            return result;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        public async Task<string> GeneratePasswordResetTokenAsync(AppUser model)
        {
            var result = await _userManager.GeneratePasswordResetTokenAsync(model);
            return result;
        }

        public async Task<IdentityResult> ResetPasswordAsync(AppUser model, string token, string password)
        {
            var result = await _userManager.ResetPasswordAsync(model, token, password);
            return result;
        }

        public async Task<List<AppUser>> GetAllUsersAsync()
        {
            var result = await _userManager.Users.ToListAsync();
            return result;
        }

        public async Task<IList<string>> GetRolesAsync(AppUser model)
        {
            var resilt = await _userManager.GetRolesAsync(model);
            return resilt;
        }

        public async Task SaveRefreshTokenAsync(RefreshToken refreshToken)
        {
            using (var _context = new AppDbContext())
            {
                await _context.RefreshTokens.AddAsync(refreshToken);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<RefreshToken> CheckRefreshTokenAsync(string refreshToken)
        {
            using (var _context = new AppDbContext())
            {
                var result = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == refreshToken);
                return result;
            }
        }

        public async Task UpdateRefreshTokenAsync(RefreshToken refreshToken)
        {
            using (var _context = new AppDbContext())
            {
                _context.RefreshTokens.Update(refreshToken);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<IdentityRole>> GetAllRolesAsync()
        {
            using (var _context = new AppDbContext())
            {
                var roles = await _context.Roles.ToListAsync();
                return roles;
            }
        }

        public async Task<IdentityResult> AddToRoleAsync(AppUser model, string role)
        {
            var result = await _userManager.AddToRoleAsync(model, role);
            return result;
        }

        public async Task<IdentityResult> UpdateUserAsync(AppUser model)
        {
            var result = await _userManager.UpdateAsync(model);
            return result;
        }

        public async Task<SignInResult> LoginUserAsync(AppUser model, string password, bool rememberMe)
        {
            var result = await _signInManager.PasswordSignInAsync(model, password, rememberMe, true);
            return result;
        }

        public async Task LogoutUserAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task DeleteUnnecessaryTokens(string userId)
        {
            using(var _context = new AppDbContext())
            {
                List<RefreshToken> tokens = await _context.RefreshTokens.Where(t=>t.UserId == userId).ToListAsync();
                foreach (RefreshToken token in tokens)
                {
                    _context.RefreshTokens.Remove(token);
                }
                await _context.SaveChangesAsync();
            }
            
        }

        public async Task<IdentityResult> PasswordChangeAsync(AppUser model, string oldPassword, string newPassword)
        {
            var result = await _userManager.ChangePasswordAsync(model, oldPassword, newPassword);
            return result;
        }

        public async Task<IdentityResult> DeleteUserAsync(AppUser model)
        {
            var result = await _userManager.DeleteAsync(model);
            return result;
        }

        public async Task<IdentityResult> BlockUnblockAsync(AppUser model, bool block)
        {
           var result = await _userManager.SetLockoutEnabledAsync(model , block);
            if(block)
            {
                var resLock =  await _userManager.SetLockoutEndDateAsync(model, DateTime.Now + TimeSpan.FromMinutes(5));
         
            }
            else
            {
           
                var resLock= await _userManager.SetLockoutEndDateAsync(model, DateTime.Now - TimeSpan.FromMinutes(1));
            }
            return result;
        }

        public async Task<bool> IsUserBlockAsync(AppUser model)
        {
            var result = await _userManager.IsLockedOutAsync(model);
            return result;
        }
    }
}
