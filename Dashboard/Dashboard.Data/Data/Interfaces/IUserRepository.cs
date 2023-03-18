using Dashboard.Data.Data.Models;
using Dashboard.Data.Data.ViewModels.UserVM;
using Microsoft.AspNetCore.Identity;


namespace Dashboard.Data.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityResult> RegisterUserAsync(AppUser model, string password);
        Task<AppUser> FindByEmailAsync(LoginUserVM model);
        Task<SignInResult> LoginUserAsync(AppUser model, string password, bool rememberMe);
        Task<bool> ValidatePasswordAsync (LoginUserVM model);
        Task<string> GenerateEmailConfirmationTokenAsync(AppUser model);
        Task<AppUser> GetUserByIdAsync(string userId);
        Task<IList<string>> GetRolesAsync(AppUser model);
        Task<AppUser> GetUserByEmailAsync(string email);
        Task<IdentityResult> ConfirmEmailAsync(AppUser model , string token);
        Task<string> GeneratePasswordResetTokenAsync(AppUser model);
        Task<IdentityResult> ResetPasswordAsync(AppUser model, string token, string password);
        Task SaveRefreshTokenAsync(RefreshToken refreshToken);
        Task<RefreshToken> CheckRefreshTokenAsync(string refreshToken);
        Task UpdateRefreshTokenAsync(RefreshToken refreshToken);
        Task<IdentityResult> UpdateUserAsync(AppUser model);
        Task<List<AppUser>> GetAllUsersAsync();
        Task<List<IdentityRole>> GetAllRolesAsync();
        Task<IdentityResult> AddToRoleAsync(AppUser model, string role);
        Task LogoutUserAsync();
        Task DeleteUnnecessaryTokens(string userId);
        Task<IdentityResult> PasswordChangeAsync(AppUser model, string oldPassword , string newPassword);
        Task<IdentityResult> DeleteUserAsync(AppUser model);
        Task<IdentityResult> BlockUnblockAsync(AppUser model , bool block);
        Task<bool> IsUserBlockAsync(AppUser model);

    }
}
