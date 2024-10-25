import axios from "axios";
import { loginSchema, userArraySchema } from "../schemas";
import { LoginUserDataSchema, RegisterFormDataSchema, UpdateFormDataSchema, UserSchema } from "../types";
import { getToken } from "../utils/auth";


export async function login(data: LoginUserDataSchema) {
  
    const result = loginSchema.safeParse(data);
    
    if (!result.success) {

        console.log(result.error.format());

        throw new Error("Error en la validación de los datos de login");

    }

    try {

        const url = "http://localhost:5057/api/Auth/login";

        const response = await axios.post(url, result.data);  

        return response.data;  
        
    } catch (error) {

        console.log(error);

    }
}

export async function getAllEmployee() {
    try {
   
      const token = getToken()
  
      const url = "http://localhost:5057/api/Admin/Get-All-Employee";
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = userArraySchema.safeParse(response.data);
  
      if (result.success) {

        return result.data;

      } 

      } catch (error) {
        console.log(error);
      }
  }

  export async function getEmployeeById(id: UserSchema['id']) {
    try {
        
      const token = getToken()

        const url = `http://localhost:5057/api/Admin/Get-Employee/${id}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;

    } catch (error) {
        console.log(error);
    }
}


  
  export async function createEmployee(employeeData: RegisterFormDataSchema) {
    try {

      const token = getToken()
  
      const url = 'http://localhost:5057/api/Admin/Create-Employee';
  
      const response = await axios.post(url, employeeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;

    } catch (error) {
      console.log(error)
    }

  }

  export async function updateEmployee(id: UserSchema['id'], updatedData: UpdateFormDataSchema) {
    try {

      const token = getToken()
  
      const url = `http://localhost:5057/api/Admin/Update-Employee/${id}`;
  
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      return response.data;

    } catch (error) {
      console.log(error)
    }
  }

  export async function deleteEmployee(id: UserSchema['id']) {
    try {
 
      const token = getToken()

      const url = `http://localhost:5057/api/Admin/Delete-Employee/${id}`;
  
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
    } catch (error) {
      console.log(error)
    }
  }
  


