$baseUrl = "http://localhost:5017"

# 1. Register User
$registerBody = @{
    Username = "testuser_custom_response"
    Password = "password123"
} | ConvertTo-Json

Write-Host "Registering User..."
try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    Write-Host "Register Response: $($registerResponse.message)"
} catch {
    Write-Host "User might already exist or error: $_"
}

# 2. Login User
$loginBody = @{
    Username = "testuser_custom_response"
    Password = "password123"
} | ConvertTo-Json

Write-Host "Logging in..."
try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    if ($loginResponse.isSuccess) {
        $token = $loginResponse.data
        Write-Host "Token received!"
    } else {
        Write-Error "Login failed: $($loginResponse.message)"
        exit
    }
} catch {
    Write-Error "Login failed: $_"
    exit
}

$headers = @{
    Authorization = "Bearer $token"
}

# 3. Create Employee
$employeeBody = @{
    FirstName = "Alice"
    LastName = "Wonderland"
    Email = "alice@example.com"
    Salary = 60000
    DateKey = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
} | ConvertTo-Json

Write-Host "Creating Employee..."
try {
    $createResponse = Invoke-RestMethod -Uri "$baseUrl/api/employees" -Method Post -Body $employeeBody -Headers $headers -ContentType "application/json"
    if ($createResponse.isSuccess) {
        $createdEmployee = $createResponse.data
        Write-Host "Employee Created: $($createdEmployee.id)"
    } else {
        Write-Error "Failed to create employee: $($createResponse.message)"
    }
}
catch {
    Write-Error "Failed to create employee: $_"
    exit
}

# 4. Get Employees
Write-Host "Getting Employees..."
$getResponse = Invoke-RestMethod -Uri "$baseUrl/api/employees" -Method Get -Headers $headers
if ($getResponse.isSuccess) {
    $employees = $getResponse.data
    $employees | Format-Table id, firstName, lastName, email
} else {
    Write-Host "Failed to get employees: $($getResponse.message)"
}

Write-Host "Verification Complete!"
