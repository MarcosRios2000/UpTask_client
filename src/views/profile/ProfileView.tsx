import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"


export default function ProfileView() {
    const { data, isLoading } = useAuth()

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

  if(data) return <ProfileForm data={data}/>
}
