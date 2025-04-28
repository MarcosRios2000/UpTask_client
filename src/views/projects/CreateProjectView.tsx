import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {
  const navigate = useNavigate()

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => mutate(formData)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Create Project</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Fill out the form below to start a new project
      </p>

      <nav className="my-5">
        <Link 
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to='/'
        >
          Back to Projects
        </Link>
      </nav>

      <form 
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm 
          register={register}
          errors={errors}
        />


        <button
          type="submit"
          disabled={isPending}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="w-6 h-6 border-4 border-white border-t-fuchsia-700 border-solid rounded-full animate-spin"></div>
          ) : (
            'Create Project'
          )}
        </button>
      </form>
    </div>
  )
}
