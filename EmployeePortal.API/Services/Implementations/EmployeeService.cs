using EmployeePortal.API.Data;
using EmployeePortal.API.Models;
using Entities;
using EmployeePortal.API.Services;
using Microsoft.EntityFrameworkCore;

namespace EmployeePortal.API.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CustomResponse> AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return new CustomResponse(true, employee, "Success", "Employee added successfully.");
        }

        public async Task<CustomResponse> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return new CustomResponse(false, null, "Error", "Employee not found.");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return new CustomResponse(true, null, "Success", "Employee deleted successfully.");
        }

        public async Task<CustomResponse> GetAllEmployeesAsync()
        {
            var employees = await _context.Employees.ToListAsync();
            return new CustomResponse(true, employees, "Success", "Employees retrieved successfully.");
        }

        public async Task<CustomResponse> GetEmployeeByIdAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return new CustomResponse(false, null, "Error", "Employee not found.");
            }
            return new CustomResponse(true, employee, "Success", "Employee retrieved successfully.");
        }

        public async Task<CustomResponse> UpdateEmployeeAsync(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return new CustomResponse(false, null, "Error", "Employee ID mismatch.");
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return new CustomResponse(true, employee, "Success", "Employee updated successfully.");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return new CustomResponse(false, null, "Error", "Employee not found.");
                }
                else
                {
                    throw;
                }
            }
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
