using EmployeePortal.API.Models;
using EmployeePortal.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("GetEmployees")]
        public async Task<IActionResult> GetEmployees()
        {
            var result = await _employeeService.GetAllEmployeesAsync();
            return Ok(result);
        }

        [HttpGet("GetEmployee/{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var result = await _employeeService.GetEmployeeByIdAsync(id);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, result);
            }

            return Ok(result);
        }

        [HttpPost("PostEmployee")]
        public async Task<IActionResult> PostEmployee(Employee employee)
        {
            var result = await _employeeService.AddEmployeeAsync(employee);
            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, result);
            }

            return Ok(result);
        }

        [HttpPut("PutEmployee/{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            var result = await _employeeService.UpdateEmployeeAsync(id, employee);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, result);
            }

            return Ok(result);
        }

        [HttpDelete("DeleteEmployee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var result = await _employeeService.DeleteEmployeeAsync(id);
            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, result);
            }

            return Ok(result);
        }
    }
}
