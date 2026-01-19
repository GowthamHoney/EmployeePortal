using EmployeePortal.API.Models;
using Entities;

namespace EmployeePortal.API.Services
{
    public interface IEmployeeService
    {
        Task<CustomResponse> GetAllEmployeesAsync();
        Task<CustomResponse> GetEmployeeByIdAsync(int id);
        Task<CustomResponse> AddEmployeeAsync(Employee employee);
        Task<CustomResponse> UpdateEmployeeAsync(int id, Employee employee);
        Task<CustomResponse> DeleteEmployeeAsync(int id);
    }
}
