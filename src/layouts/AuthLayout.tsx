import Logo from '@/components/Logo';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function AuthLayout() {
    return (
      <>
        <div className="min-h-screen bg-gray-800 flex items-center justify-center overflow-x-hidden px-4">
          <div className="w-full max-w-md py-10 lg:py-20">
          <div className="flex justify-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
            <div className="mt-10">
              <Outlet />
            </div>
          </div>
        </div>
  
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </>
    )
  }
  