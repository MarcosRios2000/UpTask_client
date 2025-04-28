import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdateCurrentUserPasswordForm } from "@/types/index"
import { changePassword } from "@/api/ProfileAPI"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => toast.success(data)
  })

  const password = watch('password')

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black">Change Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Use the form below to update your password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Current Password</label>
            <input
              id="current_password"
              type="password"
              placeholder="Enter your current password"
              className="w-full p-3 border border-gray-200"
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a new password"
              className="w-full p-3 border border-gray-200"
              {...register("password", {
                required: "New password is required",
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

          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Confirm New Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repeat your new password"
              className="w-full p-3 border border-gray-200"
              {...register("password_confirmation", {
                required: "Please confirm your new password",
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
            'Update Password'
          )}
        </button>
        </form>
      </div>
    </>
  )
}
