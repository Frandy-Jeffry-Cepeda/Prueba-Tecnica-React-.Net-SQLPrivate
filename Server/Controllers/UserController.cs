using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Employee")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }


        [HttpGet("Get-Employee")]
        public async Task<IActionResult> GetUserById()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (!int.TryParse(userId, out int parsedUserId))
            {
                return BadRequest(new { message = "ID de usuario no válido." });
            }

            var employee = await _userService.GetEmployeeById(parsedUserId);

            if (employee == null) {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return Ok(employee);
        }

        [HttpPut("Update-Employee")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
        
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var result = await _userService.UpdateEmployee(int.Parse(userId), updateUserDto);

            if (!result){
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return NoContent();
        }

    }
}
