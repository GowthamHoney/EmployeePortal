using EmployeePortal.API.DTOs;
using Entities;

namespace EmployeePortal.API.Services
{
    public interface IAuthService
    {
        Task<CustomResponse> RegisterAsync(RegisterDto dto);
        Task<CustomResponse> LoginAsync(LoginDto dto);
    }
}
