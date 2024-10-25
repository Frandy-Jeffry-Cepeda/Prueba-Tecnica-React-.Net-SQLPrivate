using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("Get-All-Employee")]
        public async Task<IActionResult> GetUsers()
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

            return Ok(userDtos);
        }   

        [HttpGet("Get-Employee/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "Usuario no encontrado." });

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

            return Ok(userDto);
        }

        [HttpPost("Create-Employee")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newUser = new User
            {

                FullName = registerDto.FullName,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                PasswordHash = registerDto.Password, 
                Role = (UserRole)Enum.Parse(typeof(UserRole), registerDto.Role), 
                Departamento = registerDto.Departamento
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        [HttpPut("Update-Employee/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "Usuario no encontrado." });

            user.FullName = updateUserDto.FullName;
            user.UserName = updateUserDto.UserName;
            user.Email = updateUserDto.Email;
            user.Departamento = updateUserDto.Departamento;
            user.Role = (UserRole)Enum.Parse(typeof(UserRole), updateUserDto.Role.ToString());
            user.PasswordHash = updateUserDto.PasswordHash; 

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }

        [HttpDelete("Delete-Employee/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound(new { message = "Usuario no encontrado." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
