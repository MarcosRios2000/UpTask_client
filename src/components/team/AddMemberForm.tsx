import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from '@/api/TeamAPI';
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    };

    const params = useParams();
    const projectId = params.projectId!;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: findUserByEmail
    });

    const { isPending } = mutation;

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData };
        mutation.mutate(data);
    };

    const resetData = () => {
        reset();
        mutation.reset();
    };

    return (
        <>
            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >
                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >
                        User Email
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Email of the user to add"
                        className="w-full p-3 border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
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
                        'Search User'
                    )}
                </button>
            </form>

            <div className="mt-10">
                {mutation.isPending && <p className="text-center">Loading...</p>}
                {mutation.error && <p className="text-center">{(mutation.error as Error).message}</p>}
                {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
            </div>
        </>
    );
}
