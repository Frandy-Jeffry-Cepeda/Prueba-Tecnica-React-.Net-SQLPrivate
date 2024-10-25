using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserService _userService;

        public AdminController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Get-All-Employee")]
        public async Task<IActionResult> GetUsers()
        {
            var employees = await _userService.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("Get-Employee/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var employee = await _userService.GetEmployeeById(id);

            if (employee == null) {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return Ok(employee);
        }

        [HttpPost("Create-Employee")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var newUser = await _userService.CreateEmployee(registerDto);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        [HttpPut("Update-Employee/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var result = await _userService.UpdateEmployee(id, updateUserDto);

            if (!result){
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return NoContent();
        }

        [HttpDelete("Delete-Employee/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteEmployee(id);

            if (!result){
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return NoContent();
        }
    }
}
