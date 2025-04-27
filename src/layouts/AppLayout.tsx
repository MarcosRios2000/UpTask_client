import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    
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
    if(isError){
        return <Navigate to='/auth/login'/>
    }

  if(data) return (
    <>
        <header className='bg-gray-800 py-5'>
            <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <div className='w-64'>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
                <NavMenu 
                    name={data.name}
                />
            </div>
        </header>
        <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
            <Outlet />
        </section>
        <footer className='py-5'>
            <p className='text-center'>
            All rights reserved {new Date().getFullYear()}
            </p>
        </footer>

        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
