import { useForm } from "react-hook-form";
import Error from "../Components/Error";  
import { LoginUserDataSchema } from "../types";
import { useLoginUser } from "../hooks/useLoginUser";


export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserDataSchema>();

  const { loginUser, loading, loginError } = useLoginUser();


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(loginUser)}
      >
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold uppercase py-5">
            Sign <span className="text-indigo-600 font-bold">in</span>
          </h2>
        </div>

        {loginError && <Error>{loginError}</Error>} 

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3 border border-gray-100"
            type="email"  
            placeholder="E-Mail"
            {...register("email", {
              required: "The E-Mail is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Formato de email inválido"
              }
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>} 
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="text-sm uppercase font-bold">
            Password
          </label>
          <input
            id="password"
            className="w-full p-3 border border-gray-100"
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "The Password is required",
              minLength: {
                value: 6,
                message: "The Password must be at least 6 characters long"
              },
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}  
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-full"
          value={loading ? "Logging in..." : "Log in"}  
          disabled={loading}  
        />
      </form>
    </div>
  );
}
