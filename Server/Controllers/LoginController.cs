using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;


namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(ApplicationDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || user.PasswordHash != loginDto.Password)
            {
                return Unauthorized(new { message = "Credenciales inválidas." });
            }
            
            var token = _jwtService.GenerateJwtToken(user);

            var authResponse = new AuthResponseDto
            {
                Success = true,
                Message = "Autenticación exitosa.",
                Token = token,
                User = new UserDto
                {
                    FullName = user.FullName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role.ToString(),
                    Departamento = user.Departamento
                }
            };

            return Ok(authResponse);
        }
    }
}
