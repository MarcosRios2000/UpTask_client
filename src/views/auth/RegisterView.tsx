import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const {mutate, isPending} = useMutation({
    mutationFn: createAccount, 
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
})

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center leading-tight">Create an Account</h1>
      <p className="text-xl font-light text-white mt-5 text-center leading-normal line-clamp-2">
        Fill out the form below to{' '}
        <span className=" text-fuchsia-500 font-bold">get started</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
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
          >Name</label>
          <input
            type="name"
            placeholder="Your name"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Create a password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repeat  Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirm your password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Please confirm your password",
              validate: value => value === password || 'Passwords do not match'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
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
            'Sign up'
          )}
        </button>
      </form>
      

      <nav className="mt-10 flex flex-col space-y-4">
      <Link
          to={'/auth/login'}
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? Log in
        </Link>

        <Link
          to={'/auth/forgot-password'}
          className="text-center text-gray-500 font-normal"
        >
          Forgot your password?
        </Link>
        </nav>
    </>
  )
}