using Microsoft.EntityFrameworkCore;
using Server.Data;


public class UserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserDto>> GetAllEmployees()
    {
        var users = await _context.Users.ToListAsync();
        var userDtos = users.Select(user => new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            UserName = user.UserName,
            Email = user.Email,
            Role = user.Role.ToString(),
            Departamento = user.Departamento
        }).ToList();

        return userDtos;
    }

    public async Task<UserDto> GetEmployeeById(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null){
            return null;
        }

        var userDto = new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            UserName = user.UserName,
            Email = user.Email,
            PasswordHash = user.PasswordHash,
            Role = user.Role.ToString(),
            Departamento = user.Departamento
        };

        return userDto;
    }

    public async Task<User> CreateEmployee(RegisterDto registerDto)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        var newUser = new User
        {
            FullName = registerDto.FullName,
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            PasswordHash = hashedPassword,
            Role = (UserRole)Enum.Parse(typeof(UserRole), registerDto.Role),
            Departamento = registerDto.Departamento
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return newUser;
    }

    public async Task<bool> UpdateEmployee(int id, UpdateUserDto updateUserDto)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) {
            return false;
        }

        user.FullName = updateUserDto.FullName;
        user.UserName = updateUserDto.UserName;
        user.Email = updateUserDto.Email;
        user.Departamento = updateUserDto.Departamento;
        user.Role = (UserRole)Enum.Parse(typeof(UserRole), updateUserDto.Role.ToString());

        if (!string.IsNullOrEmpty(updateUserDto.PasswordHash))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateUserDto.PasswordHash);
        }

        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteEmployee(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return true;
    }
}
