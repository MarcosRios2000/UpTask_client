import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePasswordWithToken } from "@/api/AuthAPI";


type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate, isPending} = useMutation({
        mutationFn: updatePasswordWithToken, 
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })


    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >New password</label>

                    <input
                        type="password"
                        placeholder="Enter your new password"
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
                    >Repeat password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat your password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repeat password is required",
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
                        'Set new password'
                    )}
                    </button>
            </form>
        </>
    )
}