import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"

export default function EditProjectView() {
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    )
  }
  if (isError) return <Navigate to='/404' />

  if (data) return <EditProjectForm data={data} projectId={projectId} />
}
