import { NoteFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/api/NoteAPI';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';


export default function AddNoteForm() {

  const location = useLocation()
  const params = useParams()

  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const initialValues : NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues})

  const queryClient = useQueryClient()
  const { mutate, isPending  } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })


  const handleAddNote = (formData: NoteFormData) => {
    mutate({projectId, taskId, formData})
    reset()
  }

  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Add note</label>
            <input 
                id="content"
                type="text"
                placeholder="Note content"
                className="w-full p-3 border-gray-300"
                {...register('content', {
                  required: 'Required'
                })}
            />
            {errors.content && (
              <ErrorMessage>{errors.content?.message}</ErrorMessage>
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
            'Create Note'
          )}
        </button>
    </form>
  )
}
