import { deleteEmployee } from "../services/Services";
import { UserSchema } from "../types";
import { useNavigate } from "react-router-dom";

type EmployeDetailProps = {
  employee: UserSchema;
};

export default function EmployeeDetail({ employee }: EmployeDetailProps) {
  const navigate = useNavigate();

  const handleDelete = async (id: UserSchema["id"]) => {

    try {
      await deleteEmployee(id);
      navigate("");
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{employee.fullName}</td>
      <td className="p-3 text-lg text-gray-800">{employee.role}</td>
      <td className="p-3 text-lg text-gray-800">{employee.departamento}</td>
      <td className="p-3 text-lg text-gray-800">{employee.email}</td>

      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              navigate(`editar-employee/${employee.id}`)
            }}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>

          <button
            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            onClick={() => {
              if (confirm("¿Eliminar?")) {
                console.log("Empleado ID a eliminar:", employee.id); // Verifica el ID aquí
                handleDelete(employee.id);
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
