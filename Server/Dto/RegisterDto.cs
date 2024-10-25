using System.ComponentModel.DataAnnotations;
public class RegisterDto
{
    public int Id { get; set; }
    
    [Required(ErrorMessage = "El nombre completo es requerido")]
    public string FullName { get; set; }

    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "Formato de email inválido")]
    public string Email { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
    public string Password { get; set; }

    [Required(ErrorMessage = "El rol es requerido")]
    public string Role { get; set; }

    [Required(ErrorMessage = "El departamento es requerido")]
    public string Departamento { get; set; }
}