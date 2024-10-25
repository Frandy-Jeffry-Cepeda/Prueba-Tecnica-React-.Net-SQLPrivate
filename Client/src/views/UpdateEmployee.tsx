import { useForm } from "react-hook-form";
import { UpdateFormDataSchema } from "../types";
import { getEmployeeById, updateEmployee } from "../services/Services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditEmployee() {

  const { handleSubmit, register, formState: { errors }, setValue } = useForm<UpdateFormDataSchema>();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const employeeId = parseInt(id || "0");

  useEffect(() => {
       getEmployeeById(employeeId)
      .then(employee => {
       setValue("fullName", employee.fullName);
       setValue("userName", employee.userName);
       setValue("email", employee.email);
       setValue("passwordHash", employee.passwordHash),
       setValue("departamento", employee.departamento);
       setValue("role", employee.role);
     });
  }, [employeeId]);

  const onSubmit = async (data: UpdateFormDataSchema) => {

    try {
      await updateEmployee(employeeId, data); 
      navigate('/admin/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-10 mx-auto max-w-6xl p-6 sm:p-10 bg-white shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-4xl font-black text-slate-500">Editar Empleado</h2>
          <Link
            to="/admin/dashboard"
            className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Volver a Dashboard
          </Link>
        </div>

        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="fullName">Nombre completo:</label>
            <input 
              id="fullName"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Pedro Enriquez Jímenez"
              {...register("fullName", { required: "El nombre completo es obligatorio" })}
            />
            {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="userName">Username:</label>
            <input 
              id="userName"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Pedro"
              {...register("userName", { required: "El username es obligatorio" })}
            />
            {errors.userName && <p className="text-red-600">{errors.userName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="user@example.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Contraseña"
              {...register("passwordHash", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
              })}
            />
            {errors.passwordHash && <p className="text-red-600">{errors.passwordHash.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="role">Rol:</label>
            <select
              id="role"
              className="mt-2 block w-full p-3 bg-gray-50"
              {...register("role", { required: "El rol es obligatorio" })}
            >
              <option value="">Selecciona un rol</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Empleado</option>
            </select>
            {errors.role && <p className="text-red-600">{errors.role.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="departamento">Departamento:</label>
            <input
              id="departamento"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="IT, Finanzas, etc."
              {...register("departamento", { required: "El departamento es obligatorio" })}
            />
            {errors.departamento && <p className="text-red-600">{errors.departamento.message}</p>}
          </div>

          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Actualizar Empleado"
          />
        </form>
      </div>
    </>
  );
}
