import { Link, useLoaderData } from "react-router-dom";
import { getAllEmployee } from "../services/Services";
import { UserSchema } from "../types";
import EmployeeDetail from "../Components/EmployeeDetail";

export async function loader() {

   const employees = await getAllEmployee()

   return employees

}

export default function Dashboard() {

  const employees = useLoaderData() as UserSchema[]

  return (
    <div className="mt-10 mx-auto max-w-6xl p-6 sm:p-10 bg-white shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className=" text-[19px] sm:text-4xl font-black text-slate-500 py-5">
          Administrador de empleados
        </h2>
        <Link
          to="crear-employee"
          className="rounded-md bg-indigo-600 p-2 sm:p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Empleado
        </Link>
      </div>


      <div className="w-full mt-6 overflow-x-auto">
        <table className="min-w-full bg-white table-auto border-collapse">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Empleado</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Departamento</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <EmployeeDetail 
                key={employee.email}
                employee={employee}
              />
            ) )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
