using System.ComponentModel.DataAnnotations;
public class UpdateUserDto
{
    [Required(ErrorMessage = "El nombre completo es requerido")]
    public string FullName { get; set; }

    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "El email es requerido")]
    public string Email { get; set; }

    [Required(ErrorMessage = "El departamento es requerido")]
    public string Departamento { get; set; }
    public string Role { get; set; }

    [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres")]
    public string PasswordHash { get; set; }
}
