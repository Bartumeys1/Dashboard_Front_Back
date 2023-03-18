using AutoMapper;
using Dashboard.Data.Data.Classes;
using Dashboard.Data.Data.Interfaces;
using Dashboard.Data.Data.Models;
using Dashboard.Data.Data.ViewModels;
using Dashboard.Data.Data.ViewModels.UserVM;
using Dashboard.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;


namespace Dashboard.Services
{
    public class UserService
    {

        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private EmailService _emailService;
        private JwtService _jwtService;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, EmailService emailService, JwtService jwtService, IConfiguration configuration, IMapper mapper)
        {
            _userRepository = userRepository;
            _emailService = emailService;
            _configuration = configuration;
            _jwtService = jwtService;
            _mapper = mapper;
        }
        public async Task<ServiceResponse> RegisterUserAsync(RegisterUserVM model)
        {
  
            var newUser = _mapper.Map<RegisterUserVM, AppUser>(model);   
            var roles = await _userRepository.GetAllRolesAsync();
            var userRole = roles.Select(r => r.Name).Where(nr => nr == model.Role).FirstOrDefault();

            var result = await _userRepository.RegisterUserAsync(newUser, model.Password);
            await _userRepository.AddToRoleAsync(newUser, userRole);

            if (result.Succeeded)
            {
                var token = await _userRepository.GenerateEmailConfirmationTokenAsync(newUser);

                var encidedEmailToken = Encoding.UTF8.GetBytes(token);
                var validEmailToken = WebEncoders.Base64UrlEncode(encidedEmailToken);

                string URL = $"{_configuration["HostSettings:URL"]}/api/User/confirmemail?userid={newUser.Id}&token={validEmailToken}";
                string emailBody = $"<h1>Confirm your email</h1><a href='{URL}'>Confirm email now</a>";

                await _emailService.SendEmailAsync(newUser.Email, "Email confirmation", emailBody);

                var tokens = await _jwtService.GenerateJwtTokenAsync(newUser);

                return new ServiceResponse
                {
                    AccessToken = tokens.token,
                    RefreshToken = tokens.refreshToken.Token,
                    Message = $"User {model.Email} successfully created.",
                    IsSuccess = true
                };
            }
            else
                return new ServiceResponse
                {
                    Message = $"Error: user not created.",
                    IsSuccess = false,
                    Errors = result.Errors.Select(e => e.Description)
                };
        }
        public async Task<ServiceResponse> LoginUserAsync(LoginUserVM model)
        {
            var user = await _userRepository.FindByEmailAsync(model);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = $"Login incorrect.",
                    IsSuccess = false
                };
            }

            var result = await _userRepository.ValidatePasswordAsync(model);
            if (!result)
            {
                return new ServiceResponse
                {
                    Message = $"Password incorrect.",
                    IsSuccess = false
                };
            }


            var signInResult = await _userRepository.LoginUserAsync(user, model.Password, model.RememberMe);
            if (signInResult.Succeeded)
            {

                var tokens = await _jwtService.GenerateJwtTokenAsync(user);

                return new ServiceResponse
                {
                    AccessToken = tokens.token,
                    RefreshToken = tokens.refreshToken.Token,
                    Message = "Logged in successfully",
                    IsSuccess = true,
                };
            }
            if (signInResult.IsNotAllowed)
            {
                return new ServiceResponse
                {
                    Message = "User cannot sign in without a confirmed email.",
                    IsSuccess = false,
                };

            }

            return new ServiceResponse
            {
                Message = "Sign in error",
                IsSuccess = false,
            };

        }
        public async Task<ServiceResponse> ConfirmEmailAsync(string userId, string token)
        {

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = $"User not found.",
                    IsSuccess = false
                };
            }

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);


            var result = await _userRepository.ConfirmEmailAsync(user, normalToken);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Message = $"Email confirmed successed.",
                    IsSuccess = true
                };
            }

            return new ServiceResponse
            {
                Message = $"Email did not confirmed.",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };

        }

        public async Task<ServiceResponse> ForgotPasswordAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if(user == null)
            {
                return new ServiceResponse
                {
                    Message = "No user associated with email.",
                    IsSuccess = false,
                };
            }

            var token = await _userRepository.GeneratePasswordResetTokenAsync(user);
            var encidedEmailToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encidedEmailToken);

            string URL = $"{_configuration["HostSettings:URL"]}/ResetPassword?email={user.Email}&token={validToken}";
            string emailBody = $"<h1>Reset password</h1><a href='{URL}'>Reset password</a>"; 

            await _emailService.SendEmailAsync(email, "Reset password", emailBody);
            return new ServiceResponse
            {
                Message = $"Reset password has been sent to the email successfully!",
                IsSuccess = true
            };

        }

        public async Task<ServiceResponse> ResetPasswordAsync(ResetPasswordVM model)
        {
            var user = await _userRepository.GetUserByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "No user associated with email",
                };
            }

            if (model.NewPassword != model.ConfirmPassword)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Password doesn't match its confirmation",
                };
            }

            var decodedToken = WebEncoders.Base64UrlDecode(model.Token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userRepository.ResetPasswordAsync(user, normalToken, model.NewPassword);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Message = "Password has been reset successfully!",
                    IsSuccess = true,
                };
            }
            return new ServiceResponse
            {
                Message = "Something went wrong",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description),
            };
        }
        public async Task<ServiceResponse> RefreshTokenAsync(TokenRequestVM model)
        {
            var result = await _jwtService.VerifyTokenAsync(model);
            if (result == null)
            {
                return result;
            }
            else
            {
                return result;
            }
        }
        public async Task<ServiceResponse> GetAllUsersAsync()
        {
            var result = await _userRepository.GetAllUsersAsync();
            var users = new List<ShowUserVM>();
            if (result.Count<=0)
            {
                return new ServiceResponse
                {
                    Message = "No registrate users!",
                    IsSuccess = true,
                };
            }

            foreach (var user in result)
            {
                var userVM = _mapper.Map<AppUser, ShowUserVM>(user);
                var role = await _userRepository.GetRolesAsync(user);
                userVM.EmailConfirmed = user.EmailConfirmed;
                userVM.Role = role.FirstOrDefault();
                users.Add(userVM);
            }

            return new ServiceResponse
            {
                Message = "Succsess",
                IsSuccess = true,
                Payload = users,
            };
        }

        public async Task<ServiceResponse> LogoutUserAsync(string userId)
        {
            await _userRepository.DeleteUnnecessaryTokens(userId);
            await _userRepository.LogoutUserAsync();
            return new ServiceResponse()
            {
                IsSuccess = true,
                Message = "User successfully logged out."
            };
        }
        public async Task<ServiceResponse> ChangeProfileAsync(ProfileUserVM model)
        {
            AppUser updetingUser = await _userRepository.GetUserByEmailAsync(model.Email);

            updetingUser.Name = model.FirstName;
            updetingUser.Surname = model.LastName;
            updetingUser.PhoneNumber = model.Phone;
            updetingUser.Email = model.Email;

            var userResult = await _userRepository.UpdateUserAsync(updetingUser);
            if (userResult == null)
            {
                return new ServiceResponse
                {
                    Message = $"Update incorrect.",
                    IsSuccess = false
                };
            }

            var tokens = await _jwtService.GenerateJwtTokenAsync(updetingUser);

            return new ServiceResponse
            {
                AccessToken = tokens.token,
                RefreshToken = tokens.refreshToken.Token,
                Message = $"User {model.Email} successfully updated.",
                IsSuccess = true
            };

        }

        public async Task<ServiceResponse> PasswordChangeAsync(PasswordChangeVM model)
        {
            var user = await _userRepository.GetUserByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    IsSuccess = false
                };
            }

            if (model.NewPassword != model.ConfirmPassword)
            {
                return new ServiceResponse
                {
                    Message = "Password do not match.",
                    IsSuccess = false
                };
            }


            var result = await _userRepository.PasswordChangeAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Message = "Password successfully updated.",
                    IsSuccess = true,
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Message = "Password not updated.",
                    IsSuccess = false,
                    Errors = result.Errors.Select(e => e.Description),
                };
            }

        }

        public async Task<ServiceResponse> DeleteUserByEmailAsync(string email)
        {
            AppUser user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    IsSuccess = false
                };
            }

            var result = await _userRepository.DeleteUserAsync(user);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Message = $"User {user.Email} was removed success.",
                    IsSuccess = true,
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Message = "Error remove user.",
                    IsSuccess = false,
                    Errors = result.Errors.Select(e => e.Description),
                };
            }
        }

        public async Task<ServiceResponse> UpdateUserAsync(EditUpdateUserVM model)
        {
            AppUser updetingUser = await _userRepository.GetUserByEmailAsync(model.Email);

            updetingUser.Name = model.FirstName;
            updetingUser.Surname = model.LastName;
            updetingUser.PhoneNumber = model.Phone;
            updetingUser.Email = model.Email;

            var userResult = await _userRepository.UpdateUserAsync(updetingUser);
            if (userResult == null)
            {
                return new ServiceResponse
                {
                    Message = $"Update incorrect.",
                    IsSuccess = false
                };
            }

            return new ServiceResponse
            {
                Message = $"User {model.Email} successfully updated.",
                IsSuccess = true
            };

        }

        public async Task<ServiceResponse> BlockUnblockAsync (string email , bool block)
        {
            AppUser user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "User not found.",
                    IsSuccess = false
                };
            }

            var result = await _userRepository.BlockUnblockAsync(user, block);
            var isBlocked = await _userRepository.IsUserBlockAsync(user);


            return new ServiceResponse
            {
                Message = $"User is block {isBlocked}",
                IsSuccess = true
            };
        }
    }
}

