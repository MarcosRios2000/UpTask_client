import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: authenticateUser, 
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: () => {
        navigate('/')
    }
})

  const handleLogin = (formData: UserLoginForm) => {
      mutate(formData)
   }

  return (
    <>

      <h1 className="text-5xl font-black text-white text-center leading-tight">Log In</h1>
      <p className="text-xl font-light text-white mt-5 text-center leading-normal line-clamp-2">
        Start managing your projects {' '}
        <span className=" text-fuchsia-500 font-bold">by logging in</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Your account email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Your password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="w-6 h-6 border-4 border-white border-t-fuchsia-700 border-solid rounded-full animate-spin"></div>
          ) : (
            'Log In'
          )}
        </button>

        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to='/auth/register'
            className="text-center text-gray-500 font-normal"
          >
            Don’t have an account? Create one
          </Link>

          <Link
            to='/auth/forgot-password'
            className="text-center text-gray-500 font-normal"
          >
            Forgot your password? Reset it
          </Link>
        </nav>
      </form>
    </>
  )
}