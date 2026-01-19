namespace EmployeePortal.API.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Position { get; set; }
        public string? Department { get; set; }
        public decimal Salary { get; set; }
        public DateTime DateKey { get; set; }
    }
}
